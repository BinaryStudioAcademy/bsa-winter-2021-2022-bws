import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import {
  group as groupServ,
  worker as workerServ,
  permission as permissionServ,
  token as tokenServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  EAMApiPath,
  GroupsApiPath,
  WorkersApiPath,
  Permission,
  UserRole,
} from '~/common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMWorkerCreateRequestDto,
  EAMGroupDeleteParamsDto,
  EAMWorkerDeleteRequestDto,
  EamGroupGetByIdRequestDto,
  TokenPayload,
} from '~/common/types/types';
import {
  eamGroupCreate as groupCreateValidationSchema,
  eamWorkerCreateBackend as workerValidationSchema,
  eamGroupUpdate as groupUpdateValidationSchema,
  UUID as UUIDValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { checkHasPermissions as checkHasPermissionsHook } from '~/hooks/hooks';
import { EAMError } from '~/exceptions/exceptions';

type Options = {
  services: {
    group: typeof groupServ;
    worker: typeof workerServ;
    permission: typeof permissionServ;
    token: typeof tokenServ;
  };
};

const initEamApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const {
    group: groupService,
    worker: workerService,
    permission: permissionService,
    token: tokenService,
  } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: EAMApiPath.WORKERS,
    schema: {
      body: workerValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof workerValidationSchema>) {
      return (
        data: EAMWorkerCreateRequestDto,
      ): ReturnType<typeof workerValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: EAMWorkerCreateRequestDto }>,
      rep,
    ) {
      return rep
        .send(
          await workerService.create({
            name: req.body.name,
            password: req.body.password,
            groupIds: req.body.groupIds,
            token: req.user?.token as string,
          }),
        )
        .status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: EAMApiPath.GROUPS,
    schema: {
      body: groupCreateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof groupCreateValidationSchema>) {
      return (
        data: EAMGroupCreateRequestDto,
      ): ReturnType<typeof groupCreateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: EAMGroupCreateRequestDto }>,
      rep,
    ) {
      const group = await groupService.create(req.body);
      return rep.send(group).status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: `${EAMApiPath.GROUPS}${GroupsApiPath.$ID}`,
    schema: {
      body: groupUpdateValidationSchema,
      params: UUIDValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof groupUpdateValidationSchema>) {
      return (
        data: EAMGroupCreateRequestDto,
      ): ReturnType<typeof groupUpdateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{
        Querystring: EamGroupGetByIdRequestDto;
        Body: EAMGroupCreateRequestDto;
      }>,
      rep,
    ) {
      const { id } = req.query;
      const group = await groupService.update(id, req.body);

      return rep.send(group).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${EAMApiPath.GROUPS}${GroupsApiPath.$ID}`,
    schema: {
      params: UUIDValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof UUIDValidationSchema>) {
      return (
        data: EamGroupGetByIdRequestDto,
      ): ReturnType<typeof UUIDValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{
        Querystring: EamGroupGetByIdRequestDto;
      }>,
      rep,
    ) {
      const { id } = req.query;
      const group = await groupService.getGroupById(id);
      return rep.send(group).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${EAMApiPath.WORKERS}${WorkersApiPath.ROOT}`,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_EAM),
    async handler(
      req: FastifyRequest<{
        Querystring: EAMWorkerGetByTenantRequestParamsDto;
      }>,
      rep: FastifyReply,
    ) {
      const workers = await workerService.getAll(req.query);
      return rep.send(workers).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${EAMApiPath.GROUPS}${GroupsApiPath.ROOT}`,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_EAM),
    async handler(
      req: FastifyRequest<{ Querystring: EAMGroupGetByTenantRequestParamsDto }>,
      rep: FastifyReply,
    ) {
      const groups = await groupService.getGroupsByTenant(req.query);
      return rep.send(groups).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: EAMApiPath.PERMISSION,
    preHandler: checkHasPermissionsHook(Permission.MANAGE_EAM),
    async handler(req, rep) {
      const permission = await permissionService.getAll();
      return rep.send(permission).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${EAMApiPath.GROUPS}${GroupsApiPath.$ID}`,
    schema: {
      params: UUIDValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof UUIDValidationSchema>) {
      return (
        data: EAMGroupDeleteParamsDto,
      ): ReturnType<typeof UUIDValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Params: EAMGroupDeleteParamsDto }>,
      rep,
    ) {
      const { id } = req.params;

      await groupServ.delete({ id });

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${EAMApiPath.WORKERS}${WorkersApiPath.$ID}`,
    schema: {
      params: UUIDValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof UUIDValidationSchema>) {
      return (
        data: EAMWorkerDeleteRequestDto,
      ): ReturnType<typeof UUIDValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Params: EAMWorkerDeleteRequestDto }>,
      rep,
    ) {
      const { id } = req.params;
      const { userRole } = tokenService.decode<TokenPayload>(
        req.user?.token as string,
      );

      if (userRole !== UserRole.MASTER) {
        throw new EAMError();
      }

      await workerService.deleteWorker(id);

      return rep.send(true).status(HttpCode.OK);
    },
  });
};

export { initEamApi };
