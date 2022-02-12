import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { master, token, tenant, group } from '~/services/services';
import { initMastersApi } from './masters/masters.api';
import { initTenantsApi } from './tenants/tenants.api';
import { authorization as authorizationPlugin } from '~/plugins/plugins';
import { WHITE_ROUTES } from '~/common/constants/constants';
import { initEamApi } from '~/api/eam/eam.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizationPlugin, {
    services: {
      master,
      token,
    },
    whiteRoutes: WHITE_ROUTES,
  });
  fastify.register(initMastersApi, {
    services: {
      master,
    },
    prefix: ApiPath.MASTERS,
  });
  fastify.register(initEamApi, {
    services: {
      group,
    },
    prefix: ApiPath.EAM,
  });
  fastify.register(initTenantsApi, {
    services: {
      tenant,
    },
    prefix: ApiPath.TENANTS,
  });
};

export { initApi };
