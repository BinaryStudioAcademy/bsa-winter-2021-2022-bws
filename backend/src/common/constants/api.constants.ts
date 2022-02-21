import {
  ApiPath,
  MastersApiPath,
  AuthApiPath,
  ENV,
} from '~/common/enums/enums';

const WHITE_ROUTES = [
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.MASTER}`,
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.WORKER}`,
  `${ENV.API.V1_PREFIX}${ApiPath.MASTERS}${MastersApiPath.SIGN_UP}`,
];

export { WHITE_ROUTES };
