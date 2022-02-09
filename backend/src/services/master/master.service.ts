import {
  MasterDto as TMaster,
  MasterSignUpRequestDto,
  MasterSignUpResponseDto,
  MasterSignInRequestDto,
  MasterSignInResponseDto,
} from '~/common/types/types';
import { master as masterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage } from '~/common/enums/enums';
import {
  token as tokenServ,
  encrypt as encryptServ,
  tenant as tenantServ,
} from '~/services/services';
import { getRandomId as getRandomName } from '~/helpers/helpers';

type Constructor = {
  masterRepository: typeof masterRep;
  encryptService: typeof encryptServ;
  tokenService: typeof tokenServ;
  tenantService: typeof tenantServ;
};

class Master {
  #masterRepository: typeof masterRep;
  #encryptService: typeof encryptServ;
  #tokenService: typeof tokenServ;
  #tenantService: typeof tenantServ;

  constructor({
    masterRepository,
    encryptService,
    tokenService,
    tenantService,
  }: Constructor) {
    this.#masterRepository = masterRepository;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
    this.#tenantService = tenantService;
  }

  async getAll(): Promise<TMaster[]> {
    const masters = await this.#masterRepository.getAll();

    return masters.map((m) => ({
      id: m.id,
      email: m.email,
    }));
  }

  async login(id: string): Promise<MasterSignUpResponseDto> {
    const { email } = (await this.#masterRepository.getById(
      id,
    )) as MasterEntity;
    return {
      user: {
        email,
        id,
      },
      token: this.#tokenService.create(id),
    };
  }

  async create({
    email,
    name,
    password,
  }: MasterSignUpRequestDto): Promise<MasterSignUpResponseDto> {
    const masterByEmail = await this.#masterRepository.getByEmail(email);
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = this.#encryptService.saltRounds;
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );
    const tenant = await this.#tenantService.create(getRandomName());

    const master = MasterEntity.createNew({
      name,
      email,
      passwordHash,
      passwordSalt,
      tenantId: tenant.id,
    });

    const { id } = await this.#masterRepository.create(master);

    return this.login(id);
  }

  async verifyLoginCredentials(
    verifyMasterDto: MasterSignInRequestDto,
  ): Promise<MasterSignInResponseDto> {
    const user = await this.#masterRepository.getByEmail(verifyMasterDto.email);

    if (!user) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INCORRECT_EMAIL,
      });
    }

    const isEqualPassword = await this.#encryptService.compare(
      verifyMasterDto.password,
      user.passwordSalt,
      user.passwordHash,
    );

    if (!isEqualPassword) {
      throw new InvalidCredentialsError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.INVALID_CREDENTIALS,
      });
    }

    return this.login(user.id);
  }
}

export { Master };
