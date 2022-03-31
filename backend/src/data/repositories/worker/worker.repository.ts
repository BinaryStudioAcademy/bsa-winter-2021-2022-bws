import {
  Worker as WorkerM,
  UsersGroups as UsersGroupsM,
  GroupsPermissions as GroupsPermissionsM,
  Permission as PermissionM,
} from '~/data/models/models';
import { Worker as WorkerEntity } from '~/services/worker/worker.entity';
import { getRandomId } from '~/helpers/helpers';
import {
  EAMWorkerGetAllItemResponseDto,
  EAMPermissionGetAllItemResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
} from '~/common/types/types';

type Constructor = {
  WorkerModel: typeof WorkerM;
  UsersGroupsModel: typeof UsersGroupsM;
  GroupsPermissionsModel: typeof GroupsPermissionsM;
  PermissionModel: typeof PermissionM;
};

type UsersGroups = {
  groupId: string;
};

class Worker {
  #WorkerModel: typeof WorkerM;
  #UsersGroupsModel: typeof UsersGroupsM;
  #GroupsPermissionsModel: typeof GroupsPermissionsM;
  #PermissionModel: typeof PermissionM;

  constructor({
    WorkerModel,
    UsersGroupsModel,
    GroupsPermissionsModel,
    PermissionModel,
  }: Constructor) {
    this.#WorkerModel = WorkerModel;
    this.#UsersGroupsModel = UsersGroupsModel;
    this.#GroupsPermissionsModel = GroupsPermissionsModel;
    this.#PermissionModel = PermissionModel;
  }

  public async getAll(
    param: EAMWorkerGetByTenantRequestParamsDto,
  ): Promise<EAMWorkerGetAllItemResponseDto[]> {
    const { from: offset, count: limit, tenantId } = param;

    return this.#WorkerModel
      .query()
      .select('id', 'name', 'createdAt')
      .where({ tenantId })
      .withGraphFetched('[groups]')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);
  }

  public getCount(
    param: EAMWorkerGetByTenantRequestParamsDto,
  ): Promise<number> {
    const { tenantId } = param;

    return this.#WorkerModel
      .query()
      .select('id')
      .where({ tenantId })
      .resultSize();
  }

  public async delete(workerId: string): Promise<number> {
    await this.#UsersGroupsModel.query().where({ 'userId': workerId }).delete();
    return this.#WorkerModel.query().deleteById(workerId);
  }

  public async getWorkerPermissions(workerId: string): Promise<string[]> {
    const groups = await this.#UsersGroupsModel
      .query()
      .select('groupId')
      .where({ 'userId': workerId });

    if (!groups) {
      return [];
    }
    const groupsIds: string[] = groups.map((item): string => item.groupId);

    const GroupPermissions = await this.#GroupsPermissionsModel
      .query()
      .select('permissionId')
      .whereIn('groupId', groupsIds);

    if (!GroupPermissions) {
      return [];
    }

    const permissionIds: Set<string> = GroupPermissions.reduce(
      (acc, it) => acc.add(it.permissionId),
      new Set<string>([]),
    );

    const permissions: EAMPermissionGetAllItemResponseDto[] =
      await this.#PermissionModel
        .query()
        .select('name')
        .whereIn('id', Array.from(permissionIds));

    return permissions.map((item) => item.name);
  }

  public async getByName(
    name: string,
    tenantId: string,
  ): Promise<WorkerEntity | null> {
    const worker = await this.#WorkerModel
      .query()
      .select()
      .where({ name })
      .where({ tenantId })
      .first();

    if (!worker) {
      return null;
    }

    const groups: UsersGroups[] = await this.#UsersGroupsModel
      .query()
      .select('group_id')
      .where({ userId: worker.id });

    const groupIds: string[] = groups.map((group) => group.groupId);

    const permissions = await this.getWorkerPermissions(worker.id);

    return Worker.modelToEntity(worker, groupIds, permissions);
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
    const permissions = await this.getWorkerPermissions(id);

    return Worker.modelToEntity(worker, groupIds, permissions);
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

    const permissions = await this.getWorkerPermissions(id);

    return Worker.modelToEntity(newWorker, groupIds, permissions);
  }

  public static modelToEntity(
    model: WorkerM,
    groupIds: string[],
    permissions: string[],
  ): WorkerEntity {
    const { id, name, passwordHash, passwordSalt, tenantId } = model;

    return WorkerEntity.initialize({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      permissions,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { Worker };
