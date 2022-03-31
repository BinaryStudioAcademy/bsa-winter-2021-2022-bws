import { space as spaceRep } from '~/data/repositories/repositories';
import { Space as SpaceEntity } from './space.entity';
import {
  BSSpaceCreateResponseDto,
  BSSpaceGetRequestParamsDto,
  BSSpaceGetResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import { s3 as s3Serv, token as tokenServ } from '~/services/services';
import { BsError } from '~/exceptions/exceptions';

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

  public async getSpacesByTenant({
    query,
    token,
  }: {
    query: BSSpaceGetRequestParamsDto;
    token: string;
  }): Promise<BSSpaceGetResponseDto> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    const tenantId = user.tenantId;

    const filter = {
      from: query.from,
      count: query.count,
      tenantId,
    };

    const spaces = await this.#spaceRepository.getByTenantId(filter);
    const countItems = await this.#spaceRepository.getCount(filter);
    return { items: spaces, countItems };
  }

  public async create({
    name,
    token,
  }: {
    name: string;
    token: string;
  }): Promise<BSSpaceCreateResponseDto> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    await this.#s3Service.creteBucket(name);

    const space = SpaceEntity.createNew({ name, createdBy: user.userId });

    return this.#spaceRepository.create(space);
  }

  public async delete(id: string): Promise<void> {
    const space = await this.#spaceRepository.getSpaceById(id);

    if (!space) {
      throw new BsError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.SPACE_NOT_FOUND,
      });
    }

    const { name } = space;

    await this.#s3Service.deleteBucket(name);

    await this.#spaceRepository.delete(id);
  }

  public async getSpaceById(id: string): Promise<SpaceEntity> {
    const space = await this.#spaceRepository.getSpaceById(id);

    if (!space) {
      throw new BsError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.SPACE_NOT_FOUND,
      });
    }
    return space;
  }
}

export { Space };
