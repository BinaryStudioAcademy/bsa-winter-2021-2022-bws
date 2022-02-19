import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { instance as InstanceServ } from '~/services/services';
import { HttpCode, HttpMethod, SCApiPath } from '~/common/enums/enums';
import { SCInstanceCreateRequestDto } from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { scInstanceCreate as scInstanceCreateValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    instance: typeof InstanceServ;
  };
};

const initScApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { instance: instanceService } = opts.services;

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
      const instance = await instanceService.create(req.body);
      return rep.send(instance).status(HttpCode.CREATED);
    },
  });
};

export { initScApi };
