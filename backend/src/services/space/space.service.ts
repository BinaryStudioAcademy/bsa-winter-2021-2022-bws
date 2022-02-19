import { space as spaceRep } from '~/data/repositories/repositories';
import { Space as SpaceEntity } from './space.entity';
import { TokenPayload } from '~/common/types/types';
import { ExceptionMessage, HttpCode, UserRole } from '~/common/enums/enums';
import { s3 as s3Serv, token as tokenServ } from '~/services/services';
import { InvalidCredentialsError } from '~/exceptions/invalid-credentials-error/invalid-credentials-error';

type Constructor = {
  spaceRepository: typeof spaceRep;
  tokenService: typeof tokenServ;
  s3Service: typeof s3Serv;
};

class Space {
  #spaceRepository: typeof spaceRep;
  #tokenService: typeof tokenServ;
  #s3Service: typeof s3Serv;

  constructor({ spaceRepository, tokenService, s3Service }: Constructor) {
    this.#spaceRepository = spaceRepository;
    this.#tokenService = tokenService;
    this.#s3Service = s3Service;
  }

  public async create({
    name,
    token,
  }: {
    name: string;
    token: string;
  }): Promise<SpaceEntity> {
    const user: TokenPayload = await tokenServ.decode(token);

    if (user.userRole === UserRole.MASTER) {
      throw new InvalidCredentialsError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_SPACE_CREATE,
      });
    }

    await this.#s3Service.creteBucket({ name });

    const space = SpaceEntity.createNew({ name, createdBy: user.userId });

    return this.#spaceRepository.create(space);
  }
}

export { Space };
