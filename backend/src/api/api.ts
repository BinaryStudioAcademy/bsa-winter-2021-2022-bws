import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { master, token } from '~/services/services';
import { initMastersApi } from './masters/masters.api';
import { authorization as authorizationPlugin } from '~/plugins/authorization/authorization.plugin';
import { WHITE_ROUTES } from '~/common/constants/api.constants';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizationPlugin, {
    services: {
      master,
      token,
    },
    routesWhiteList: WHITE_ROUTES,
  });
  fastify.register(initMastersApi, {
    services: {
      master,
    },
    prefix: ApiPath.MASTERS,
  });
};

export { initApi };
