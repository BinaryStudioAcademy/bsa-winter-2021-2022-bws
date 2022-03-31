import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { slcFunction as slcFunctionServ } from '~/services/services';
import { slcFunctionCreate as slcFunctionCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import {
  HttpCode,
  HttpMethod,
  SLCApiPath,
  SLCFunctionApiPath,
  UserRole,
  Permission,
} from '~/common/enums/enums';
import {
  SLCFunctionCreateRequestDto,
  SLCFunctionGetRequestParamsDto,
  SLCFunctionDeleteParamsDto,
  SLCFunctionUpdateParamsDto,
  SLCFunctionUpdateRequestDto,
  SLCFunctionLoadParamsDto,
  SLCFunctionRunParamsDto,
  SLCFunctionRunRequestDto,
} from '~/common/types/types';
import {
  checkHasPermissions as checkHasPermissionsHook,
  checkHasRole as checkHasRoleHook,
} from '~/hooks/hooks';

type Options = {
  services: {
    slcFunction: typeof slcFunctionServ;
  };
};

const initSLCApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { slcFunction: slcFunctionService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: SLCApiPath.SLC_FUNCTIONS,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SLC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    schema: {
      body: slcFunctionCreateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof slcFunctionCreateValidationSchema>) {
      return (
        data: SLCFunctionCreateRequestDto,
      ): ReturnType<typeof slcFunctionCreateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: SLCFunctionCreateRequestDto }>,
      rep: FastifyReply,
    ) {
      return rep
        .send(
          await slcFunctionService.create({
            name: req.body.name,
            token: req.userData?.token as string,
          }),
        )
        .status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SLC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(
      req: FastifyRequest<{
        Params: SLCFunctionRunParamsDto;
        Body: SLCFunctionRunRequestDto;
      }>,
      rep: FastifyReply,
    ) {
      return rep
        .send(
          await slcFunctionService.runById({
            id: req.params.id,
            payload: req.body.payload,
          }),
        )
        .status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: SLCApiPath.SLC_FUNCTIONS,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SLC),
    async handler(
      req: FastifyRequest<{ Querystring: SLCFunctionGetRequestParamsDto }>,
      rep: FastifyReply,
    ) {
      const slcFunctions = await slcFunctionService.getSLCFunctionsByTenant({
        query: req.query,
        token: req.userData?.token as string,
      });

      return rep.send(slcFunctions).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SLC),
    async handler(
      req: FastifyRequest<{
        Params: SLCFunctionLoadParamsDto;
      }>,
      rep: FastifyReply,
    ) {
      return rep
        .send(
          await slcFunctionService.loadById({
            id: req.params.id,
          }),
        )
        .status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SLC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(
      req: FastifyRequest<{ Params: SLCFunctionDeleteParamsDto }>,
      rep: FastifyReply,
    ) {
      await slcFunctionService.delete(req.params.id);

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SLC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(
      req: FastifyRequest<{
        Params: SLCFunctionUpdateParamsDto;
        Body: SLCFunctionUpdateRequestDto;
      }>,
      rep: FastifyReply,
    ) {
      return rep
        .send(
          await slcFunctionService.updateById({
            id: req.params.id,
            sourceCode: req.body.sourceCode,
          }),
        )
        .status(HttpCode.OK);
    },
  });
};

export { initSLCApi };
