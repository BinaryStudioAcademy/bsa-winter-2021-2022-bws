import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { EAMTenantByIdRequestParamsDto } from '~/common/types/types';
import { tenant as tenantServ } from '~/services/services';
import { HttpCode, HttpMethod, TenantsApiPath } from '~/common/enums/enums';

type Options = {
  services: {
    tenant: typeof tenantServ;
  };
};

const initTenantsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { tenant: tenantService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: TenantsApiPath.$ID,
    async handler(
      req: FastifyRequest<{ Params: EAMTenantByIdRequestParamsDto }>,
      rep,
    ) {
      const tenant = await tenantService.getTenantById(req.params.id);
      return rep.send(tenant).status(HttpCode.OK);
    },
  });
};

export { initTenantsApi };
