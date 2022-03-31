import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  instance as InstanceServ,
  operationSystem as OperationSystemServ,
  keyPair as KeyPairServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  SCApiPath,
  InstancesApiPath,
  SshKeysApiPath,
  Permission,
  UserRole,
} from '~/common/enums/enums';
import {
  SCInstanceCreateRequestDto,
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceDeleteParamsDto,
  SCInstanceUpdateParamsDto,
  SCInstanceUpdateRequestDto,
  SCSshKeyGetByIdParamsDto,
} from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import {
  scInstanceCreate as scInstanceCreateValidationSchema,
  scInstanceUpdate as scInstanceUpdateValidationSchema,
} from '~/validation-schemas/validation-schemas';
import {
  checkHasPermissions as checkHasPermissionsHook,
  checkHasRole as checkHasRoleHook,
} from '~/hooks/hooks';

type Options = {
  services: {
    instance: typeof InstanceServ;
    operationSystem: typeof OperationSystemServ;
    keyPair: typeof KeyPairServ;
  };
};

const initScApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const {
    instance: instanceService,
    operationSystem: operationSystemService,
    keyPair: keyPairService,
  } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: SCApiPath.OPERATION_SYSTEMS,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SC),
    async handler(req, rep) {
      const operationSystems = await operationSystemService.getAll();
      return rep.send(operationSystems).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${SCApiPath.SSH_KEYS}${SshKeysApiPath.$ID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(
      req: FastifyRequest<{
        Params: SCSshKeyGetByIdParamsDto;
      }>,
      rep: FastifyReply,
    ) {
      const sshKey = await keyPairService.getSshKeyById(req.params.id);
      return rep.send(sshKey).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: SCApiPath.ROOT,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_SC),
    async handler(
      req: FastifyRequest<{
        Querystring: SCInstanceGetByTenantRequestParamsDto;
      }>,
      rep: FastifyReply,
    ) {
      const instances = await instanceService.getByTenantId({
        requestParams: req.query,
        token: req.userData?.token as string,
      });
      return rep.send(instances).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${SCApiPath.INSTANCES}${InstancesApiPath.$ID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    async handler(
      req: FastifyRequest<{
        Params: SCInstanceDeleteParamsDto;
      }>,
      rep: FastifyReply,
    ) {
      await instanceService.delete(req.params.id);
      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: `${SCApiPath.INSTANCES}${InstancesApiPath.$ID}`,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    schema: {
      body: scInstanceUpdateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof scInstanceUpdateValidationSchema>) {
      return (
        data: SCInstanceUpdateRequestDto,
      ): ReturnType<typeof scInstanceUpdateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{
        Params: SCInstanceUpdateParamsDto;
        Body: SCInstanceUpdateRequestDto;
      }>,
      rep: FastifyReply,
    ) {
      const instance = await instanceService.update(req.params.id, req.body);
      return rep.send(instance).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: SCApiPath.ROOT,
    preHandler: [
      checkHasPermissionsHook(Permission.MANAGE_SC),
      checkHasRoleHook(UserRole.WORKER),
    ],
    schema: {
      body: scInstanceCreateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof scInstanceCreateValidationSchema>) {
      return (
        data: SCInstanceCreateRequestDto,
      ): ReturnType<typeof scInstanceCreateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: SCInstanceCreateRequestDto }>,
      rep: FastifyReply,
    ) {
      const instance = await instanceService.create({
        instanceCredentials: req.body,
        token: req.userData?.token as string,
      });
      return rep.send(instance).status(HttpCode.CREATED);
    },
  });
};

export { initScApi };
