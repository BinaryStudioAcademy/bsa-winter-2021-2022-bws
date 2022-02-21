import { ExceptionMessage, HttpCode, UserRole } from '~/common/enums/enums';
import {
  EAMMasterSignInRequestDto,
  EAMMasterSignInResponseDto,
  EAMWorkerSignInRequestDto,
  EAMWorkerSignInResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import {
  master as masterServ,
  worker as workerServ,
  token as tokenServ,
} from '~/services/services';

type Constructor = {
  masterService: typeof masterServ;
  workerService: typeof workerServ;
  tokenService: typeof tokenServ;
};

class Auth {
  #masterService: typeof masterServ;
  #workerService: typeof workerServ;
  #tokenService: typeof tokenServ;

  constructor({ masterService, workerService, tokenService }: Constructor) {
    this.#masterService = masterService;
    this.#workerService = workerService;
    this.#tokenService = tokenService;
  }

  public async getMaster(
    masterDto: EAMMasterSignInRequestDto,
  ): Promise<EAMMasterSignInResponseDto> {
    return this.#masterService.verifyLoginCredentials(masterDto);
  }

  public async getWorker(
    workerDto: EAMWorkerSignInRequestDto,
  ): Promise<EAMWorkerSignInResponseDto> {
    return this.#workerService.verifyLoginCredentials(workerDto);
  }

  public async getCurrentUser(
    token: string,
  ): Promise<null | EAMMasterSignInResponseDto | EAMWorkerSignInResponseDto> {
    try {
      const { userId, userRole } =
        this.#tokenService.decode<TokenPayload>(token);
      switch (userRole) {
        case UserRole.MASTER: {
          return this.#masterService.getUserById(userId);
        }
        case UserRole.WORKER: {
          return this.#workerService.getUserById(userId);
        }
        default: {
          throw new Error();
        }
      }
    } catch {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.INVALID_TOKEN,
      });
    }
  }
}

export { Auth };
