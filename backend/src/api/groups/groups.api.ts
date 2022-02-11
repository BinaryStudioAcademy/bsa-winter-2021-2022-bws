import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { group as groupServ } from '~/services/services';
import { HttpCode, HttpMethod, GroupsApiPath } from '~/common/enums/enums';
import { EAMGroupCreateRequestDto } from '~/common/types/types';

type Options = {
  services: {
    group: typeof groupServ;
  };
};

const initGroupApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { group: groupService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: GroupsApiPath.ROOT,
    async handler(
      req: FastifyRequest<{ Body: EAMGroupCreateRequestDto }>,
      rep,
    ) {
      const group = await groupService.create(req.body);
      return rep.send(group).status(HttpCode.CREATED);
    },
  });
};

export { initGroupApi };
