import { Group as GroupM } from '~/data/models/models';
import { Group as GroupEntity } from '~/services/group/group.entity';

type Constructor = {
  GroupModel: typeof GroupM;
};

class Group {
  #GroupModel: typeof GroupM;

  constructor({ GroupModel }: Constructor) {
    this.#GroupModel = GroupModel;
  }

  async getGroupByNameAndTenant(
    name: string,
    tenantId: string,
  ): Promise<GroupEntity | null> {
    const group = await this.#GroupModel
      .query()
      .select()
      .where({ name })
      .andWhere({ tenantId })
      .first();

    if (!group) {
      return null;
    }

    return Group.modelToEntity(group);
  }

  async create(group: GroupEntity): Promise<GroupEntity> {
    const { id, name, tenantId, createdAt } = group;

    const created = await this.#GroupModel.query().insert({
      id,
      name,
      createdAt: createdAt.toISOString(),
      tenantId,
    });

    return Group.modelToEntity(created);
  }

  public static modelToEntity(model: GroupM): GroupEntity {
    return GroupEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: new Date(model.createdAt),
      tenantId: model.tenantId,
    });
  }
}

export { Group };
