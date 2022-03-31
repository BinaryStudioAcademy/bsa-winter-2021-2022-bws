import { FastifyRequest, FastifyReply } from 'fastify';
import { ExceptionMessage, HttpCode, UserRole } from '~/common/enums/enums';
import { TokenPayload } from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';
import { token as tokenService } from '~/services/services';

const checkHasRole =
  (...roles: UserRole[]) =>
  async (req: FastifyRequest, _rep: FastifyReply): Promise<void> => {
    const token = req.userData?.token as string;
    const { userRole } = tokenService.decode<TokenPayload>(token);
    const hasRole = Boolean(roles.length);

    if (!hasRole) {
      throw new HttpError({
        status: HttpCode.LOCKED,
        message: ExceptionMessage.USER_ROLE_NOT_ADD,
      });
    }

    const hasCorrectRole = roles.some((it) => it === userRole);

    if (!hasCorrectRole) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.USER_ROLE,
      });
    }
  };

export { checkHasRole };
