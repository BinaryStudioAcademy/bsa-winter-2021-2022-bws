import { worker as workerRep } from '~/data/repositories/repositories';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { Worker as WorkerEntity } from './worker.entity';
import { HttpCode } from '~/common/enums/http/http';
import {
  encrypt as encryptServ,
  token as tokenServ,
  master as masterServ,
} from '~/services/services';
import { InvalidCredentialsError } from '~/exceptions/invalid-credentials-error/invalid-credentials-error';

type Constructor = {
  workerRepository: typeof workerRep;
  encryptService: typeof encryptServ;
  tokenService: typeof tokenServ;
  masterService: typeof masterServ;
};

class Worker {
  #workerRepository: typeof workerRep;
  #encryptService: typeof encryptServ;
  #tokenService: typeof tokenServ;
  #masterService: typeof masterServ;

  constructor({
    workerRepository,
    encryptService,
    tokenService,
    masterService,
  }: Constructor) {
    this.#workerRepository = workerRepository;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
    this.#masterService = masterService;
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
}

export { Worker };
