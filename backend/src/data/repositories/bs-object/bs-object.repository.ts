import { BSObject as BSObjectM } from '~/data/models/models';
import { BSObject as BSObjectEntity } from '~/services/bs-object/bs-object.entity';

type Constructor = {
  BSObjectModel: typeof BSObjectM;
};

class BSObject {
  #BSObjectModel: typeof BSObjectM;

  constructor({ BSObjectModel }: Constructor) {
    this.#BSObjectModel = BSObjectModel;
  }

  async create(bsObject: BSObjectEntity): Promise<BSObjectEntity> {
    const { id, name, sizeInBytes, spaceId, uploadedBy, awsObjectKey } =
      bsObject;

    const model = await this.#BSObjectModel.query().insert({
      id,
      name,
      sizeInBytes,
      createdAt: bsObject.createdAt.toISOString(),
      spaceId,
      uploadedBy,
      awsObjectKey,
    });
    return BSObject.modelToEntity(model);
  }
  public static modelToEntity(model: BSObjectM): BSObjectEntity {
    const { id, name, sizeInBytes, spaceId, uploadedBy, awsObjectKey } = model;

    return BSObjectEntity.initialize({
      id,
      name,
      sizeInBytes,
      createdAt: new Date(model.createdAt),
      spaceId,
      uploadedBy,
      awsObjectKey,
    });
  }
}

export { BSObject };
