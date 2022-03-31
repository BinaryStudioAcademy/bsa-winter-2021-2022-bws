import { bsObject as bsObjectRep } from '~/data/repositories/repositories';
import {
  s3 as s3Serv,
  space as spaceServ,
  token as tokenServ,
  worker as workerServ,
} from '~/services/services';
import { BSObject as BSObjectEntity } from './bs-object.entity';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage } from '~/common/enums/enums';
import { BsError } from '~/exceptions/exceptions';
import {
  UploadPayload,
  TokenPayload,
  GetObjectCommandOutput,
  BSObjectGetResponseDto,
  BSObjectGetRequestParamsDto,
} from '~/common/types/types';

type Constructor = {
  bsObjectRepository: typeof bsObjectRep;
  s3Service: typeof s3Serv;
  spaceService: typeof spaceServ;
  tokenService: typeof tokenServ;
  workerService: typeof workerServ;
};
class BSObject {
  #bsObjectRepository: typeof bsObjectRep;
  #s3Service: typeof s3Serv;
  #spaceService: typeof spaceServ;
  #tokenService: typeof tokenServ;
  #workerService: typeof workerServ;

  constructor({
    bsObjectRepository,
    s3Service,
    spaceService,
    tokenService,
    workerService,
  }: Constructor) {
    this.#bsObjectRepository = bsObjectRepository;
    this.#s3Service = s3Service;
    this.#spaceService = spaceService;
    this.#tokenService = tokenService;
    this.#workerService = workerService;
  }

  public async upload({
    token,
    file,
    id,
  }: UploadPayload): Promise<BSObjectEntity> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    const space = await this.#spaceService.getSpaceById(id);

    const worker = await this.#workerService.getUserById(space.createdBy);
    const isCurrentWorkerOwnerOfSpace =
      worker?.user?.tenantId === user.tenantId;
    const hasFile = file;

    if (!isCurrentWorkerOwnerOfSpace || !hasFile) {
      throw new BsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.OBJECT_NOT_UPLOADED,
      });
    }
    const { ETag: awsObjectKey } = await this.#s3Service.uploadObject({
      spaceName: space.name,
      file: file.buffer as Buffer,
      fileName: file.originalname,
    });

    if (!awsObjectKey) {
      throw new BsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.OBJECT_NOT_UPLOADED,
      });
    }
    const objectUploadEntity = BSObjectEntity.createNew({
      name: file.originalname,
      sizeInBytes: file.size as number,
      spaceId: space.id,
      uploadedBy: user.userId,
      awsObjectKey: awsObjectKey.substring(1, awsObjectKey.length - 1),
    });
    return this.#bsObjectRepository.create(objectUploadEntity);
  }

  public async download({
    token,
    spaceId,
    objectId,
  }: {
    token: string;
    spaceId: string;
    objectId: string;
  }): Promise<GetObjectCommandOutput> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    const space = await this.#spaceService.getSpaceById(spaceId);

    const worker = await this.#workerService.getUserById(space.createdBy);
    const isCurrentWorkerOwnerOfSpace =
      worker?.user?.tenantId === user.tenantId;

    if (!isCurrentWorkerOwnerOfSpace) {
      throw new BsError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.OBJECT_ACCESS_DENIED,
      });
    }

    const object = await this.#bsObjectRepository.getById(objectId);

    if (!object) {
      throw new BsError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.OBJECT_NOT_FOUND,
      });
    }

    return this.#s3Service.downloadObject({
      bucket: space.name,
      key: object.name,
    });
  }

  public async getObjects({
    spaceId,
    from,
    count,
    token,
  }: BSObjectGetRequestParamsDto & {
    spaceId: string;
    token: string;
  }): Promise<BSObjectGetResponseDto> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    const filter = {
      spaceId,
      from,
      count,
      tenantId: user.tenantId,
    };

    const objects = await this.#bsObjectRepository.getObjects(filter);
    const countItems = await this.#bsObjectRepository.getCount(spaceId);

    return { items: objects, countItems };
  }

  public async deleteObject(
    spaceId: string,
    objectId: string,
    tenantId: string,
  ): Promise<void> {
    const object = await this.#bsObjectRepository.getByIdAndTenant(
      objectId,
      tenantId,
    );

    const hasObject = Boolean(object && object.spaceId == spaceId);

    if (!hasObject) {
      throw new BsError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.OBJECT_NOT_FOUND,
      });
    }

    const { name } = await this.#spaceService.getSpaceById(spaceId);

    await this.#s3Service.deleteObject({
      bucket: name,
      key: object?.name as string,
    });

    await this.#bsObjectRepository.deleteById(objectId);
  }
}

export { BSObject };
