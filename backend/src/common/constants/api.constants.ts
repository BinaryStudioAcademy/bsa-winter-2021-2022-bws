import { ApiPath, AuthApiPath, ENV } from '~/common/enums/enums';

const WHITE_ROUTES = [
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.MASTER}`,
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.WORKER}`,
];

export { WHITE_ROUTES };
