import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  space as spaceServ,
  bsObject as bsObjectServ,
  token as tokenServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  BSApiPath,
  SpacesApiPath,
  Permission,
  UserRole,
  ExceptionMessage,
  FormDataCommonKey,
} from '~/common/enums/enums';
import {
  BSSpaceCreateRequestDto,
  BSSpaceDeleteParamsDto,
  BSSpaceGetRequestParamsDto,
  BSObjectDownloadParamsDto,
  BSObjectUploadParamsDto,
  TokenPayload,
  BSObjectGetRequestParamsDto,
  BSObjectDeleteParamsDto,
} from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import {
  bsSpaceCreate as bsSpaceCreateValidationSchema,
  UUID as UUIDValidationSchema,
} from '~/validation-schemas/validation-schemas';
import {
  upload as uploadHook,
  checkHasPermissions as checkHasPermissionsHook,
} from '~/hooks/hooks';
import { BsError } from '~/exceptions/exceptions';

type Options = {
  services: {
    space: typeof spaceServ;
    bsObject: typeof bsObjectServ;
    token: typeof tokenServ;
  };
};

const initBsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const {
    space: spaceService,
    bsObject: bsObjectService,
    token: tokenService,
  } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: BSApiPath.SPACES,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_BS),
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
    preHandler: checkHasPermissionsHook(Permission.MANAGE_BS),
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
    preHandler: checkHasPermissionsHook(Permission.MANAGE_BS),
    schema: {
      params: UUIDValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof UUIDValidationSchema>) {
      return (
        data: BSSpaceDeleteParamsDto,
      ): ReturnType<typeof UUIDValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Params: BSSpaceDeleteParamsDto }>,
      rep: FastifyReply,
    ) {
      const { id } = req.params;
      const token = req.user?.token as string;
      const { userRole } = tokenService.decode<TokenPayload>(token);

      if (userRole !== UserRole.WORKER) {
        throw new BsError({
          status: HttpCode.DENIED,
          message: ExceptionMessage.MASTER_SPACE_DELETE,
        });
      }

      await spaceService.delete(id);

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
      uploadHook.single(FormDataCommonKey.FILE),
      checkHasPermissionsHook(Permission.MANAGE_BS),
    ],
    async onError(req, rep, err) {
      if (err) {
        return rep.status(HttpCode.BAD_REQUEST);
      }
    },
    async handler(
      req: FastifyRequest<{ Params: BSObjectUploadParamsDto }>,
      rep,
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
    preHandler: checkHasPermissionsHook(Permission.MANAGE_BS),
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
    preHandler: checkHasPermissionsHook(Permission.MANAGE_BS),
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

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$SPACEID_OBJECTS_$OBJECTID}`,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_BS),
    async handler(
      req: FastifyRequest<{ Params: BSObjectDeleteParamsDto }>,
      rep: FastifyReply,
    ) {
      const { spaceId, objectId } = req.params;
      const token = req.user?.token as string;
      const { userRole, tenantId } = tokenService.decode<TokenPayload>(token);

      if (userRole !== UserRole.WORKER) {
        throw new BsError({
          status: HttpCode.DENIED,
          message: ExceptionMessage.MASTER_OBJECT_DELETE,
        });
      }

      await bsObjectService.deleteObject(spaceId, objectId, tenantId);

      return rep.send(true).status(HttpCode.OK);
    },
  });
};

export { initBsApi };
