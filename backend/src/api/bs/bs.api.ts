import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { space as spaceServ } from '~/services/services';
import { HttpCode, HttpMethod, BSApiPath } from '~/common/enums/enums';
import {
  BSSpaceCreateRequestDto,
  BSSpaceGetRequestParamsDto,
} from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { bsSpaceCreate as bsSpaceCreateValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    space: typeof spaceServ;
  };
};

const initBsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { space: spaceService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: BSApiPath.SPACES,
    schema: {
      body: bsSpaceCreateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof bsSpaceCreateValidationSchema>) {
      return (
        data: BSSpaceCreateRequestDto,
      ): ReturnType<typeof bsSpaceCreateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(req: FastifyRequest<{ Body: BSSpaceCreateRequestDto }>, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      return rep
        .send(
          await spaceService.create({
            name: req.body.name,
            token,
          }),
        )
        .status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: BSApiPath.SPACES,
    async handler(
      req: FastifyRequest<{ Querystring: BSSpaceGetRequestParamsDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      const spaces = await spaceService.getSpacesByTenant({
        query: req.query,
        token,
      });

      return rep.send(spaces).status(HttpCode.OK);
    },
  });
};

export { initBsApi };
