import { Space as SpaceM } from '~/data/models/space/space.model';
import { Space as SpaceEntity } from '~/services/space/space.entity';
import {
  BSSpaceGetFilter,
  BSSpaceGetResponseItemDto,
} from '~/common/types/types';
import { TableName } from '~/common/enums/db/table-name.enum';

type Constructor = {
  SpaceModel: typeof SpaceM;
};

class Space {
  #SpaceModel: typeof SpaceM;

  constructor({ SpaceModel }: Constructor) {
    this.#SpaceModel = SpaceModel;
  }

  async create(space: SpaceEntity): Promise<SpaceEntity> {
    const { id, name, createdAt, createdBy, awsS3Id } = space;

    const created = await this.#SpaceModel.query().insert({
      id,
      name,
      createdAt,
      createdBy,
      awsS3Id,
    });

    return Space.modelToEntity(created);
  }

  async getByTenantId(
    filter: BSSpaceGetFilter,
  ): Promise<BSSpaceGetResponseItemDto[]> {
    const { from: offset, count: limit, tenantId } = filter;
    return this.#SpaceModel
      .query()
      .select(`${TableName.SPACES}.name`, `${TableName.SPACES}.createdAt`)
      .join(TableName.WORKERS, 'createdBy', '=', `${TableName.WORKERS}.id`)
      .where({ tenantId })
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);
  }

  public static modelToEntity(model: SpaceM): SpaceEntity {
    return SpaceEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: model.createdAt,
      createdBy: model.createdBy,
      awsS3Id: model.awsS3Id,
    });
  }
}

export { Space };
