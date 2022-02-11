import {
  MasterSignUpRequestDto,
  MasterSignUpResponseDto,
  MasterSignInRequestDto,
  MasterSignInResponseDto,
  TokenPayload,
  MasterDto,
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

  public async getMasterById(id: string): Promise<MasterDto | null> {
    const master = await this.#masterRepository.getById(id);
    if (!master) {
      return null;
    }

    return {
      id: master.id,
      email: master.email,
      tenantId: master.tenantId,
    };
  }

  public async login(id: string): Promise<MasterSignUpResponseDto> {
    const { email, tenantId } = (await this.#masterRepository.getById(
      id,
    )) as MasterEntity;
    return {
      user: {
        email,
        id,
        tenantId,
      },
      token: this.#tokenService.create({
        userId: id,
      }),
    };
  }

  public async getCurrentUser(token: string): Promise<MasterSignUpResponseDto> {
    const { userId } = this.#tokenService.decode<TokenPayload>(token);
    return this.login(userId);
  }

  public async create({
    email,
    name,
    password,
  }: MasterSignUpRequestDto): Promise<MasterSignUpResponseDto> {
    const masterByEmail = await this.#masterRepository.getByEmail(email);
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = await this.#encryptService.createSalt();
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

  public async verifyLoginCredentials(
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
