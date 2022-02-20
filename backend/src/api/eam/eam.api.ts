import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import {
  group as groupServ,
  worker as workerServ,
  permission as permissionServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  EAMApiPath,
  GroupsApiPath,
  WorkersApiPath,
} from '~/common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMWorkerCreateRequestDto,
} from '~/common/types/types';
import { eamGroupCreate as groupCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';

type Options = {
  services: {
    group: typeof groupServ;
    worker: typeof workerServ;
  };
};

const initEamApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { group: groupService } = opts.services;
  const { worker: workerService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: EAMApiPath.WORKERS,
    async handler(
      req: FastifyRequest<{ Body: EAMWorkerCreateRequestDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      return rep
        .send(
          await workerService.create({
            name: req.body.name,
            password: req.body.password,
            groupIds: req.body.groupIds,
            token,
          }),
        )
        .status(HttpCode.OK);
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
    url: `${EAMApiPath.PERMISSION}`,
    async handler(req, rep) {
      const permission = await permissionServ.getAll();
      return rep.send(permission).status(HttpCode.OK);
    },
  });
};

export { initEamApi };
