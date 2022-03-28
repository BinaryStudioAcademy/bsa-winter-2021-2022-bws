import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import {
  slcFunction as slcFunctionServ,
  token as tokenServ,
} from '~/services/services';
import {
  slcFunctionCreate as slcFunctionCreateValidationSchema,
  UUID as UUIDValidationSchema,
} from '~/validation-schemas/validation-schemas';
import {
  HttpCode,
  HttpMethod,
  SLCApiPath,
  SLCFunctionApiPath,
  UserRole,
  Permission,
  ExceptionMessage,
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
  TokenPayload,
} from '~/common/types/types';
import { SLCError } from '~/exceptions/exceptions';
import { checkHasPermissions as checkHasPermissionsHook } from '~/hooks/hooks';

type Options = {
  services: {
    slcFunction: typeof slcFunctionServ;
    token: typeof tokenServ;
  };
};

const initSLCApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { slcFunction: slcFunctionService, token: tokenService } =
    opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: SLCApiPath.SLC_FUNCTIONS,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SLC),
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
            token: req.user?.token as string,
          }),
        )
        .status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SLC),
    async handler(
      req: FastifyRequest<{
        Params: SLCFunctionRunParamsDto;
        Body: SLCFunctionRunRequestDto;
      }>,
      rep: FastifyReply,
    ) {
      const { userRole } = tokenService.decode<TokenPayload>(
        req.user?.token as string,
      );

      if (userRole !== UserRole.WORKER) {
        throw new SLCError({
          status: HttpCode.DENIED,
          message: ExceptionMessage.MASTER_FUNCTION_RUN,
        });
      }

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
        token: req.user?.token as string,
      });

      return rep.send(slcFunctions).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SLC),
    schema: {
      params: UUIDValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof UUIDValidationSchema>) {
      return (
        data: SLCFunctionLoadParamsDto,
      ): ReturnType<typeof UUIDValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
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
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SLC),
    async handler(
      req: FastifyRequest<{ Params: SLCFunctionDeleteParamsDto }>,
      rep: FastifyReply,
    ) {
      const { id } = req.params;
      const { userRole } = tokenService.decode<TokenPayload>(
        req.user?.token as string,
      );

      if (userRole !== UserRole.WORKER) {
        throw new SLCError({
          status: HttpCode.DENIED,
          message: ExceptionMessage.MASTER_FUNCTION_DELETE,
        });
      }

      await slcFunctionService.delete(id);

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SLC),
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
            token: req.user?.token as string,
          }),
        )
        .status(HttpCode.OK);
    },
  });
};

export { initSLCApi };
