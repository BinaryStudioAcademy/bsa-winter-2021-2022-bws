import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import {
  master,
  tenant,
  group,
  worker,
  auth,
  space,
  slcFunction,
} from '~/services/services';
import { WHITE_ROUTES } from '~/common/constants/constants';
import { authorization as authorizationPlugin } from '~/plugins/plugins';
import { initMastersApi } from './masters/masters.api';
import { initTenantsApi } from './tenants/tenants.api';
import { initBsApi } from '~/api/bs/bs.api';
import { initAuthApi } from './auth/auth.api';
import { initEamApi } from './eam/eam.api';
import { initSLCApi } from './slc/slc.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizationPlugin, {
    services: {
      auth,
    },
    whiteRoutes: WHITE_ROUTES,
  });
  fastify.register(initAuthApi, {
    services: {
      auth,
    },
    prefix: ApiPath.AUTH,
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
      worker,
    },
    prefix: ApiPath.EAM,
  });
  fastify.register(initTenantsApi, {
    services: {
      tenant,
    },
    prefix: ApiPath.TENANTS,
  });
  fastify.register(initBsApi, {
    services: {
      space,
    },
    prefix: ApiPath.BS,
  });
  fastify.register(initSLCApi, {
    services: {
      slcFunction,
    },
    prefix: ApiPath.SLC,
  });
};

export { initApi };
