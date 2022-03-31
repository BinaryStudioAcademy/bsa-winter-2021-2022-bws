import { FastifyRequest, FastifyReply } from 'fastify';
import { HttpCode, ExceptionMessage, Permission } from '~/common/enums/enums';
import {
  EAMWorkerSignInResponseDto,
  EAMMasterSignInResponseDto,
} from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

const checkHasPermissions =
  (...permissions: Permission[]) =>
  async (req: FastifyRequest, _rep: FastifyReply): Promise<void> => {
    const { userData } = req;

    const hasUser = Boolean(userData);

    if (!hasUser) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.PERMISSION_LACK,
      });
    }

    const hasUserPermission = checkHasPermission(
      permissions,
      (userData as EAMMasterSignInResponseDto | EAMWorkerSignInResponseDto).user
        .permissions ?? [],
    );

    if (!hasUserPermission) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.PERMISSION_LACK,
      });
    }
  };

export { checkHasPermissions };
