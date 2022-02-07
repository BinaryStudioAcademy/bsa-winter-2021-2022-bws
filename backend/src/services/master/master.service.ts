import {
  MasterDto as TMaster,
  MasterSignUpDto,
  MasterSignUpResponseDto,
} from '~/common/types/types';
import { master as masterRep } from '~/data/repositories/repositories';
import { Master as MasterEntity } from './master.entity';
import { createToken } from '~/helpers/token/create-token/create-token.helper';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { encryptService as encryptServ } from '~/services/services';

type Constructor = {
  masterRepository: typeof masterRep;
  encryptService: typeof encryptServ;
};

class Master {
  #masterRepository: typeof masterRep;
  #encryptService: typeof encryptServ;

  constructor({ masterRepository, encryptService }: Constructor) {
    this.#masterRepository = masterRepository;
    this.#encryptService = encryptService;
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
      token: createToken(id),
    };
  }

  async create({
    email,
    name,
    password,
  }: MasterSignUpDto): Promise<MasterSignUpResponseDto> {
    const masterByEmail = await this.#masterRepository.getByEmail(email);
    if (masterByEmail) {
      throw new InvalidCredentialsError();
    }

    const passwordSalt = await this.#encryptService.createSalt();
    const passwordHash = await this.#encryptService.createHash(
      password,
      passwordSalt,
    );
    const master = MasterEntity.createNew({
      name,
      email,
    });
    const { id } = await this.#masterRepository.create({
      master,
      passwordSalt,
      passwordHash,
    });

    return this.login(id);
  }
}

export { Master };
