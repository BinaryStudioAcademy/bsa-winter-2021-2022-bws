import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import {
  master,
  tenant,
  group,
  worker,
  auth,
  instance,
  space,
  operationSystem,
  keyPair,
  slcFunction,
  bsObject,
  token,
  permission,
} from '~/services/services';
import { WHITE_ROUTES } from '~/common/constants/constants';
import {
  authorization as authorizationPlugin,
  file as filePlugin,
} from '~/plugins/plugins';
import { initTenantsApi } from './tenants/tenants.api';
import { initBsApi } from '~/api/bs/bs.api';
import { initAuthApi } from './auth/auth.api';
import { initEamApi } from './eam/eam.api';
import { initScApi } from './sc/sc.api';
import { initSLCApi } from './slc/slc.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizationPlugin, {
    services: {
      auth,
    },
    whiteRoutes: WHITE_ROUTES,
  });
  fastify.register(filePlugin);
  fastify.register(initAuthApi, {
    services: {
      master,
      auth,
    },
    prefix: ApiPath.AUTH,
  });
  fastify.register(initEamApi, {
    services: {
      group,
      worker,
      permission,
      token,
    },
    prefix: ApiPath.EAM,
  });
  fastify.register(initTenantsApi, {
    services: {
      tenant,
    },
    prefix: ApiPath.TENANTS,
  });
  fastify.register(initScApi, {
    services: {
      instance,
      operationSystem,
      keyPair,
    },
    prefix: ApiPath.SC,
  });
  fastify.register(initBsApi, {
    services: {
      space,
      bsObject,
      token,
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
