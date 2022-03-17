import { bsObject as bsObjectRep } from '~/data/repositories/repositories';
import {
  s3 as s3Serv,
  space as spaceServ,
  token as tokenServ,
  worker as workerServ,
} from '~/services/services';
import { BSObject as BSObjectEntity } from './bs-object.entity';
import { TokenPayload } from 'bws-shared/common/types/types';
import { BsObjectError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage } from '~/common/enums/enums';
import { UploadPayload } from '~/common/types/types';

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

    const space = await this.#spaceService.getSpacesById(id);

    const worker = await this.#workerService.getUserById(space.createdBy);
    const isCurrentWorker = worker?.user?.tenantId === user.tenantId;
    const hasFile = file;

    if (!isCurrentWorker || !hasFile) {
      throw new BsObjectError({
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
      throw new BsObjectError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.OBJECT_NOT_UPLOADED,
      });
    }
    const objectUploadEntity = BSObjectEntity.createNew({
      name: file.originalname,
      sizeInBytes: file.size as number,
      spaceId: space.id,
      uploadedBy: user.userId,
      awsObjectKey: awsObjectKey.substring(1, -1),
    });
    return this.#bsObjectRepository.create(objectUploadEntity);
  }
}

export { BSObject };
