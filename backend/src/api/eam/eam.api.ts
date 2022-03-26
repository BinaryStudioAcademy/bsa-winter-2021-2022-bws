import { FastifyPluginAsync, FastifyRequest } from 'fastify';
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
  UserRole,
} from '~/common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMWorkerCreateRequestDto,
  EAMGroupDeleteParamsDto,
  EAMWorkerDeleteRequestDto,
  TokenPayload,
} from '~/common/types/types';
import {
  eamGroupCreate as groupCreateValidationSchema,
  eamWorkerCreateBackend as workerValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { EAMError } from '~/exceptions/exceptions';

type Options = {
  services: {
    group: typeof groupServ;
    worker: typeof workerServ;
    token: typeof tokenServ;
  };
};

const initEamApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const {
    group: groupService,
    worker: workerService,
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
    method: HttpMethod.GET,
    url: `${EAMApiPath.WORKERS}${WorkersApiPath.ROOT}`,
    async handler(
      req: FastifyRequest<{
        Querystring: EAMWorkerGetByTenantRequestParamsDto;
      }>,
      rep,
    ) {
      const workers = await workerService.getAll(req.query);
      return rep.send(workers).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${EAMApiPath.GROUPS}${GroupsApiPath.ROOT}`,
    async handler(
      req: FastifyRequest<{ Querystring: EAMGroupGetByTenantRequestParamsDto }>,
      rep,
    ) {
      const groups = await groupService.getGroupsByTenant(req.query);
      return rep.send(groups).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: EAMApiPath.PERMISSION,
    async handler(req, rep) {
      const permission = await permissionServ.getAll();
      return rep.send(permission).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${EAMApiPath.GROUPS}${GroupsApiPath.$ID}`,
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
