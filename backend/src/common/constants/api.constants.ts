import { ApiPath, MastersApiPath, ENV } from '~/common/enums/enums';

const WHITE_ROUTES = [
  `${ENV.API.V1_PREFIX}${ApiPath.MASTERS}${MastersApiPath.SIGN_UP}`,
  `${ENV.API.V1_PREFIX}${ApiPath.MASTERS}${MastersApiPath.SIGN_IN}`,
];

export { WHITE_ROUTES };
