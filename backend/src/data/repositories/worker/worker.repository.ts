import {
  Worker as WorkerM,
  UsersGroups as UsersGroupsM,
  Group as GroupM,
} from '~/data/models/models';
import { Worker as WorkerEntity } from '~/services/worker/worker.entity';
import { getRandomId } from '~/helpers/helpers';
import {
  EAMWorkerGetAllItemResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
} from '~/common/types/types';

type Constructor = {
  WorkerModel: typeof WorkerM;
  UsersGroupsModel: typeof UsersGroupsM;
  GroupModel: typeof GroupM;
};

type UsersGroups = {
  groupId: string;
};

class Worker {
  #WorkerModel: typeof WorkerM;
  #UsersGroupsModel: typeof UsersGroupsM;
  #GroupModel: typeof GroupM;

  constructor({ WorkerModel, UsersGroupsModel, GroupModel }: Constructor) {
    this.#WorkerModel = WorkerModel;
    this.#UsersGroupsModel = UsersGroupsModel;
    this.#GroupModel = GroupModel;
  }

  public async getAll(
    param: EAMWorkerGetByTenantRequestParamsDto,
  ): Promise<EAMWorkerGetAllItemResponseDto[]> {
    const { from: offset, count: limit, tenantId } = param;

    const workers = await this.#WorkerModel
      .query()
      .select('id', 'name', 'createdAt')
      .where({ tenantId })
      .withGraphFetched('[groups]')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);

    return workers;
  }

  public async getByName(name: string): Promise<WorkerEntity | null> {
    const worker = await this.#WorkerModel
      .query()
      .select()
      .where({ name })
      .first();

    if (!worker) {
      return null;
    }

    const groups: UsersGroups[] = await this.#UsersGroupsModel
      .query()
      .select('group_id')
      .where({ userId: worker.id });

    const groupIds: string[] = groups.map((group) => group.groupId);

    return Worker.modelToEntity(worker, groupIds);
  }

  async getById(id: string): Promise<WorkerEntity | null> {
    const worker = await this.#WorkerModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!worker) {
      return null;
    }

    const groups: UsersGroups[] = await this.#UsersGroupsModel
      .query()
      .select('group_id')
      .where({ userId: id });

    const groupIds: string[] = groups.map((group) => group.groupId);

    return Worker.modelToEntity(worker, groupIds);
  }

  async getGroupIdsByTenant(
    groupIds: string[],
    tenantId: string,
  ): Promise<string[]> {
    const groups = await this.#GroupModel
      .query()
      .select('id')
      .where({ tenantId });

    const groupIdsByTenant = groups
      .map((group) => group.id)
      .filter((id) => {
        return groupIds.some((groupId) => groupId === id);
      });

    return groupIdsByTenant;
  }

  public async create(worker: WorkerEntity): Promise<WorkerEntity> {
    const { id, name, passwordHash, passwordSalt, tenantId, groupIds } = worker;

    const newWorker = await this.#WorkerModel.query().insert({
      id,
      name,
      passwordHash,
      passwordSalt,
      createdAt: worker.createdAt.toISOString(),
      tenantId,
    });

    const hasGroupsIds = Boolean(groupIds.length);

    if (hasGroupsIds) {
      await this.#UsersGroupsModel.query().insert(
        groupIds.map((groupId) => ({
          id: getRandomId(),
          userId: id,
          groupId: groupId,
          createdAt: worker.createdAt.toISOString(),
        })),
      );
    }
    return Worker.modelToEntity(newWorker, groupIds);
  }

  public static modelToEntity(
    model: WorkerM,
    groupIds: string[],
  ): WorkerEntity {
    const { id, name, passwordHash, passwordSalt, tenantId } = model;

    return WorkerEntity.initialize({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { Worker };
