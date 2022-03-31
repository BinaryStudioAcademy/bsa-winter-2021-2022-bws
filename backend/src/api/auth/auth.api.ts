import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { master as masterServ, auth as authServ } from '~/services/services';
import {
  eamMasterSignUp as masterSignUpValidationSchema,
  eamMasterSignIn as masterSignInValidationSchema,
  eamWorkerSignIn as workerSignInValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { HttpCode, HttpMethod, AuthApiPath } from '~/common/enums/enums';
import {
  EAMMasterSignUpRequestDto,
  EAMMasterSignInRequestDto,
  EAMWorkerSignInRequestDto,
} from '~/common/types/types';

type Options = {
  services: { master: typeof masterServ; auth: typeof authServ };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { master: masterService, auth: authService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.ROOT,
    async handler(req, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const user = await authService.getCurrentUser(token);

      return rep.send(user).status(HttpCode.OK);
    },
  });
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_UP,
    schema: {
      body: masterSignUpValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof masterSignUpValidationSchema>) {
      return (
        data: EAMMasterSignUpRequestDto,
      ): ReturnType<typeof masterSignUpValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: EAMMasterSignUpRequestDto }>,
      rep: FastifyReply,
    ) {
      const user = await masterService.create(req.body);
      return rep.send(user).status(HttpCode.CREATED);
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
      rep: FastifyReply,
    ) {
      const signInUserPayload = await authService.getMaster(req.body);
      return rep.send(signInUserPayload).status(HttpCode.OK);
    },
  });
  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.WORKER,
    schema: {
      body: workerSignInValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof workerSignInValidationSchema>) {
      return (
        data: EAMWorkerSignInRequestDto,
      ): ReturnType<typeof workerSignInValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: EAMWorkerSignInRequestDto }>,
      rep: FastifyReply,
    ) {
      const signInUserPayload = await authService.getWorker(req.body);
      return rep.send(signInUserPayload).status(HttpCode.OK);
    },
  });
};

export { initAuthApi };
