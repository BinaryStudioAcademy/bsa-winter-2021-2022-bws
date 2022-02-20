import {
  EAMMasterSignUpRequestDto,
  EAMMasterSignUpResponseDto,
  EAMMasterSignInRequestDto,
  EAMMasterSignInResponseDto,
  EAMMasterByIdResponseDto,
} from '~/common/types/types';
import { master as masterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage, UserRole } from '~/common/enums/enums';
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

  public async getMasterById(
    id: string,
  ): Promise<EAMMasterByIdResponseDto | null> {
    const master = await this.#masterRepository.getById(id);
    if (!master) {
      return null;
    }

    return {
      id: master.id,
      email: master.email,
      tenantId: master.tenantId,
      permissions: master.permissions,
    };
  }

  public async login(id: string): Promise<EAMMasterSignUpResponseDto> {
    const { email, tenantId, permissions } =
      (await this.#masterRepository.getById(id)) as MasterEntity;
    return {
      user: {
        email,
        id,
        tenantId,
        permissions,
      },
      token: this.#tokenService.create({
        userId: id,
        userRole: UserRole.MASTER,
        tenantId,
      }),
    };
  }

  public async getUserById(
    userId: string,
  ): Promise<EAMMasterSignUpResponseDto> {
    return this.login(userId);
  }

  public async create({
    email,
    name,
    password,
  }: EAMMasterSignUpRequestDto): Promise<EAMMasterSignUpResponseDto> {
    const masterByEmail = await this.#masterRepository.getByEmail(email);
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );
    const tenant = await this.#tenantService.create({ name: getRandomName() });

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

  public async verifyLoginCredentials(
    verifyMasterDto: EAMMasterSignInRequestDto,
  ): Promise<EAMMasterSignInResponseDto> {
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
