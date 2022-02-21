import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { auth as authServ } from '~/services/services';
import { eamMasterSignIn as masterSignInValidationSchema } from '~/validation-schemas/validation-schemas';
import {
  HttpCode,
  HttpMethod,
  AuthApiPath,
  ExceptionMessage,
} from '~/common/enums/enums';
import {
  EAMWorkerSignInRequestDto,
  EAMMasterSignInRequestDto,
} from '~/common/types/types';
import { InvalidCredentialsError } from '~/exceptions/exceptions';

type Options = {
  services: {
    auth: typeof authServ;
  };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { auth: authService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.ROOT,
    async handler(req, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      const user = await authService.getCurrentUser(token).catch(() => {
        throw new InvalidCredentialsError({
          status: HttpCode.BAD_REQUEST,
          message: ExceptionMessage.INVALID_TOKEN,
        });
      });

      return rep.send(user).status(HttpCode.OK);
    },
  });
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.MASTER,
    schema: {
      body: masterSignInValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof masterSignInValidationSchema>) {
      return (
        data: EAMMasterSignInRequestDto,
      ): ReturnType<typeof masterSignInValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: EAMMasterSignInRequestDto }>,
      rep,
    ) {
      const signInUserPayload = await authService.getMaster(req.body);
      return rep.send(signInUserPayload).status(HttpCode.OK);
    },
  });
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.WORKER,
    async handler(
      req: FastifyRequest<{ Body: EAMWorkerSignInRequestDto }>,
      rep,
    ) {
      const signInUserPayload = await authService.getWorker(req.body);
      return rep.send(signInUserPayload).status(HttpCode.OK);
    },
  });
};

export { initAuthApi };
