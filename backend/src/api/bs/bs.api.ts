import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  space as spaceServ,
  bsObject as bsObjectServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  BSApiPath,
  SpacesApiPath,
  Permission,
  UserRole,
} from '~/common/enums/enums';
import {
  BSSpaceCreateRequestDto,
  BSSpaceDeleteParamsDto,
  BSSpaceGetRequestParamsDto,
  BSObjectDownloadParamsDto,
  BSObjectUploadParamsDto,
  BSObjectGetRequestParamsDto,
} from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { bsSpaceCreate as bsSpaceCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import {
  upload as uploadHook,
  checkHasPermissions as checkHasPermissionsHook,
  checkHasRole as checkHasRoleHook,
} from '~/hooks/hooks';

type Options = {
  services: {
    space: typeof spaceServ;
    bsObject: typeof bsObjectServ;
  };
};

const initBsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { space: spaceService, bsObject: bsObjectService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: BSApiPath.SPACES,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_BS),
      checkHasRoleHook(UserRole.WORKER),
    ],
    schema: {
      body: bsSpaceCreateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof bsSpaceCreateValidationSchema>) {
      return (
        data: BSSpaceCreateRequestDto,
      ): ReturnType<typeof bsSpaceCreateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: BSSpaceCreateRequestDto }>,
      rep: FastifyReply,
    ) {
      return rep
        .send(
          await spaceService.create({
            name: req.body.name,
            token: req.user?.token as string,
          }),
        )
        .status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: BSApiPath.SPACES,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_BS),
      checkHasRoleHook(),
    ],
    async handler(
      req: FastifyRequest<{ Querystring: BSSpaceGetRequestParamsDto }>,
      rep: FastifyReply,
    ) {
      const spaces = await spaceService.getSpacesByTenant({
        query: req.query,
        token: req.user?.token as string,
      });

      return rep.send(spaces).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$ID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_BS),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(
      req: FastifyRequest<{ Params: BSSpaceDeleteParamsDto }>,
      rep: FastifyReply,
    ) {
      await spaceService.delete(req.params.id);

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route<{
    Params: BSObjectUploadParamsDto;
    File: File;
  }>({
    method: HttpMethod.POST,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$ID_OBJECTS}`,
    preHandler: [
      uploadHook.single('file'),
      checkHasPermissionsHook(Permission.MANAGE_BS),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(
      req: FastifyRequest<{ Params: BSObjectUploadParamsDto }>,
      rep: FastifyReply,
    ) {
      const { id } = req.params;

      await bsObjectService.upload({
        token: req.user?.token as string,
        file: req.file,
        id,
      });

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route<{
    Params: BSObjectDownloadParamsDto;
  }>({
    method: HttpMethod.GET,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$SPACEID_OBJECTS_$OBJECTID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_BS),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(req, rep) {
      const { spaceId, objectId } = req.params;

      const object = await bsObjectService.download({
        token: req.user?.token as string,
        spaceId,
        objectId,
      });

      return rep.send(object).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$ID_OBJECTS}`,
    async handler(
      req: FastifyRequest<{
        Querystring: BSObjectGetRequestParamsDto;
        Params: { id: string };
      }>,
      rep: FastifyReply,
    ) {
      const objects = await bsObjectService.getObjects({
        spaceId: req.params.id,
        from: req.query.from,
        count: req.query.count,
        token: req.user?.token as string,
      });

      return rep.send(objects).status(HttpCode.OK);
    },
  });
};

export { initBsApi };
