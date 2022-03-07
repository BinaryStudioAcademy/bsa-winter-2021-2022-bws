import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import {
  instance as InstanceServ,
  operationSystem as OperationSystemServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  SCApiPath,
  InstancesApiPath,
} from '~/common/enums/enums';
import {
  SCInstanceCreateRequestDto,
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceDeleteRequestDto,
} from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { scInstanceCreate as scInstanceCreateValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    instance: typeof InstanceServ;
    operationSystem: typeof OperationSystemServ;
  };
};

const initScApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { instance: instanceService, operationSystem: operationSystemService } =
    opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: SCApiPath.OPERATION_SYSTEMS,
    async handler(req, rep) {
      const operationSystems = await operationSystemService.getAll();
      return rep.send(operationSystems).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: SCApiPath.ROOT,
    async handler(
      req: FastifyRequest<{
        Querystring: SCInstanceGetByTenantRequestParamsDto;
      }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const instances = await instanceService.getByTenantId({
        requestParams: req.query,
        token,
      });
      return rep.send(instances).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${SCApiPath.INSTANCES}${InstancesApiPath.$ID}`,
    async handler(
      req: FastifyRequest<{
        Params: SCInstanceDeleteRequestDto;
      }>,
      rep,
    ) {
      await instanceService.delete(req.params.id);
      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: SCApiPath.ROOT,
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
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const instance = await instanceService.create({
        instanceCredentials: req.body,
        token,
      });
      return rep.send(instance).status(HttpCode.CREATED);
    },
  });
};

export { initScApi };
