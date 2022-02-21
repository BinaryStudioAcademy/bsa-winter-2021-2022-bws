import { worker as workerRep } from '~/data/repositories/repositories';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
  EAMWorkerSignInRequestDto,
  EAMWorkerSignInResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  TokenPayload,
} from '~/common/types/types';
import { Worker as WorkerEntity } from './worker.entity';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage, UserRole } from '~/common/enums/enums';
import {
  encrypt as encryptServ,
  master as masterServ,
  token as tokenServ,
  tenant as tenantServ,
} from '~/services/services';
import { InvalidCredentialsError } from '~/exceptions/invalid-credentials-error/invalid-credentials-error';

type Constructor = {
  workerRepository: typeof workerRep;
  encryptService: typeof encryptServ;
  tokenService: typeof tokenServ;
  masterService: typeof masterServ;
  tenantService: typeof tenantServ;
};

class Worker {
  #workerRepository: typeof workerRep;
  #encryptService: typeof encryptServ;
  #tokenService: typeof tokenServ;
  #masterService: typeof masterServ;
  #tenantService: typeof tenantServ;

  constructor({
    workerRepository,
    encryptService,
    tokenService,
    masterService,
    tenantService,
  }: Constructor) {
    this.#workerRepository = workerRepository;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
    this.#masterService = masterService;
    this.#tenantService = tenantService;
  }

  public async login(id: string): Promise<EAMWorkerSignInResponseDto> {
    const { name, tenantId } = (await this.#workerRepository.getById(
      id,
    )) as WorkerEntity;
    return {
      user: {
        id,
        name,
        tenantId,
      },
      token: this.#tokenService.create({
        userId: id,
        userRole: UserRole.WORKER,
        tenantId,
      }),
    };
  }

  public async getUserById(
    userId: string,
  ): Promise<EAMWorkerSignInResponseDto> {
    return this.login(userId);
  }

  public async create({
    name,
    password,
    token,
    groupIds,
  }: EAMWorkerCreateRequestDto): Promise<EAMWorkerCreateResponseDto> {
    const workerByName = await this.#workerRepository.getByName(name);

    if (workerByName) {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: `Worker with name ${name} exist`,
      });
    }

    const { userId } = this.#tokenService.decode<TokenPayload>(token);

    const master = await this.#masterService.getMasterById(userId);

    if (!master) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: 'Master not Found',
      });
    }

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );

    const worker = WorkerEntity.createNew({
      name,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      tenantId: master.tenantId,
      groupIds,
    });

    return await this.#workerRepository.create(worker);
  }

  public async verifyLoginCredentials(
    verifyWorkerDto: EAMWorkerSignInRequestDto,
  ): Promise<EAMWorkerSignInResponseDto> {
    const worker = await this.#workerRepository.getByName(
      verifyWorkerDto.workerName,
    );

    if (!worker) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.WORKER_NAME,
      });
    }

    const tenant = await this.#tenantService.getTenantById(worker.tenantId);

    if (verifyWorkerDto.tenantName !== tenant?.name) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INVALID_CREDENTIALS,
      });
    }

    const isEqualPassword = await this.#encryptService.compare(
      verifyWorkerDto.password,
      worker.passwordSalt,
      worker.passwordHash,
    );

    if (!isEqualPassword) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INVALID_CREDENTIALS,
      });
    }

    return this.login(worker.id);
  }

  async getAll(
    param: EAMWorkerGetByTenantRequestParamsDto,
  ): Promise<EAMWorkerGetAllResponseDto> {
    const workers = await this.#workerRepository.getAll(param);
    return { items: workers };
  }
}

export { Worker };
