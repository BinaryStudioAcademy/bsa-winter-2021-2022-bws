import { BSObject as BSObjectM } from '~/data/models/models';
import { BSObject as BSObjectEntity } from '~/services/bs-object/bs-object.entity';
import { TableName } from '~/common/enums/db/table-name.enum';
import {
  BSObjectGetFilter,
  BSObjectGetResponseItemDto,
} from '~/common/types/types';

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

  async getById(id: string): Promise<BSObjectEntity | null> {
    const object = await this.#BSObjectModel
      .query()
      .select()
      .where({ id })
      .first();
    return object ? BSObject.modelToEntity(object) : null;
  }

  async getByIdAndTenant(
    id: string,
    tenantId: string,
  ): Promise<BSObjectEntity | null> {
    const object = await this.#BSObjectModel
      .query()
      .join(TableName.WORKERS, 'uploadedBy', '=', `${TableName.WORKERS}.id`)
      .select()
      .where({ 'objects.id': id })
      .andWhere({ tenantId })
      .first();
    return object ? BSObject.modelToEntity(object) : null;
  }

  async getObjects(
    filter: BSObjectGetFilter,
  ): Promise<BSObjectGetResponseItemDto[]> {
    const { from: offset, count: limit, spaceId, tenantId } = filter;

    return this.#BSObjectModel
      .query()
      .select(
        `${TableName.OBJECTS}.id`,
        `${TableName.OBJECTS}.name`,
        `${TableName.OBJECTS}.createdAt`,
        'sizeInBytes',
      )
      .join(TableName.WORKERS, 'uploadedBy', '=', `${TableName.WORKERS}.id`)
      .where({ tenantId })
      .andWhere({ spaceId })
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset);
  }

  public async deleteById(id: string): Promise<void> {
    await this.#BSObjectModel.query().delete().where({ id });
  }

  public async getCount(spaceId: string): Promise<number> {
    return this.#BSObjectModel.query().select().where({ spaceId }).resultSize();
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
