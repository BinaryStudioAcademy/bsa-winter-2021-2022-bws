import {
  worker as workerRep,
  tenant as tenantRep,
  space as spaceRep,
  slcFunction as slcFunctionRep,
  instance as instanceRep,
} from '~/data/repositories/repositories';
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
  instance as instanceServ,
  space as spaceServ,
  slcFunction as slcFunctionServ,
} from '~/services/services';
import { InvalidCredentialsError, EAMError } from '~/exceptions/exceptions';

type Constructor = {
  workerRepository: typeof workerRep;
  tenantRepository: typeof tenantRep;
  spaceRepository: typeof spaceRep;
  slcFunctionRepository: typeof slcFunctionRep;
  instanceRepository: typeof instanceRep;
  encryptService: typeof encryptServ;
  tokenService: typeof tokenServ;
  masterService: typeof masterServ;
  tenantService: typeof tenantServ;
  instanceService: typeof instanceServ;
  spaceService: typeof spaceServ;
  slcFunctionService: typeof slcFunctionServ;
};

class Worker {
  #workerRepository: typeof workerRep;
  #tenantRepository: typeof tenantRep;
  #spaceRepository: typeof spaceRep;
  #slcFunctionRepository: typeof slcFunctionRep;
  #instanceRepository: typeof instanceRep;
  #encryptService: typeof encryptServ;
  #tokenService: typeof tokenServ;
  #masterService: typeof masterServ;
  #tenantService: typeof tenantServ;
  #instanceService: typeof instanceServ;
  #spaceService: typeof spaceServ;
  #slcFunctionService: typeof slcFunctionServ;

  constructor({
    workerRepository,
    tenantRepository,
    spaceRepository,
    slcFunctionRepository,
    instanceRepository,
    encryptService,
    tokenService,
    masterService,
    tenantService,
    instanceService,
    spaceService,
    slcFunctionService,
  }: Constructor) {
    this.#workerRepository = workerRepository;
    this.#tenantRepository = tenantRepository;
    this.#spaceRepository = spaceRepository;
    this.#slcFunctionRepository = slcFunctionRepository;
    this.#instanceRepository = instanceRepository;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
    this.#masterService = masterService;
    this.#tenantService = tenantService;
    this.#instanceService = instanceService;
    this.#spaceService = spaceService;
    this.#slcFunctionService = slcFunctionService;
  }

  public async login(id: string): Promise<EAMWorkerSignInResponseDto> {
    const { name, tenantId, permissions } =
      (await this.#workerRepository.getById(id)) as WorkerEntity;
    return {
      user: {
        id,
        name,
        tenantId,
        permissions,
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
    const { tenantId } = this.#tokenService.decode<TokenPayload>(token);

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );

    const workerByName = await this.#workerRepository.getByName(name, tenantId);

    if (workerByName) {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.WORKER_NAME_EXISTS,
      });
    }

    const worker = WorkerEntity.createNew({
      name,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      tenantId,
      permissions: [],
      groupIds,
    });

    const hasGroups = Boolean(worker.groupIds.length);

    if (!hasGroups) {
      throw new InvalidCredentialsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.GROUP_NOT_SELECTED,
      });
    }
    return await this.#workerRepository.create(worker);
  }

  public async verifyLoginCredentials(
    verifyWorkerDto: EAMWorkerSignInRequestDto,
  ): Promise<EAMWorkerSignInResponseDto> {
    const { tenantName, workerName, password } = verifyWorkerDto;

    const tenant = await this.#tenantRepository.getByName(tenantName);

    if (!tenant) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_TENANT_NAME,
      });
    }

    const worker = await this.#workerRepository.getByName(
      workerName,
      tenant.id,
    );

    if (!worker) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_WORKER_NAME,
      });
    }

    const isEqualPassword = await this.#encryptService.compare(
      password,
      worker.passwordSalt,
      worker.passwordHash,
    );

    if (!isEqualPassword) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
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

  public async deleteWorker({
    id,
    token,
  }: {
    id: string;
    token: string;
  }): Promise<void> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    if (user.userRole !== UserRole.MASTER) {
      throw new EAMError();
    }

    const master = await this.#masterService.getMasterById(id);

    if (master) {
      throw new EAMError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_DELETE,
      });
    }

    const instances = await this.#instanceRepository.getByWorkerId(id);
    const spaces = await this.#spaceRepository.getByWorkerId(id);
    const slcFunctions = await this.#slcFunctionRepository.getByWorkerId(id);

    await Promise.all(
      instances.map((instance) => this.#instanceService.delete(instance.id)),
    );
    await Promise.all(
      spaces.map((item) => {
        const id = item.id;
        return this.#spaceService.delete({ id, token });
      }),
    );
    await Promise.all(
      slcFunctions.map((slcFunction) => {
        const id = slcFunction.id;
        return this.#slcFunctionService.delete({ id, token });
      }),
    );

    await this.#workerRepository.deleteWorker(id);
  }
}

export { Worker };
