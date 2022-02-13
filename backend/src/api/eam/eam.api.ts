import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { group as groupServ, worker as workerServ } from '~/services/services';
import { HttpCode, HttpMethod, EAMApiPath } from '~/common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMWorkerCreateRequestDto,
} from '~/common/types/types';

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
    async handler(
      req: FastifyRequest<{ Body: EAMGroupCreateRequestDto }>,
      rep,
    ) {
      const group = await groupService.create(req.body);
      return rep.send(group).status(HttpCode.CREATED);
    },
  });
};

export { initEamApi };
