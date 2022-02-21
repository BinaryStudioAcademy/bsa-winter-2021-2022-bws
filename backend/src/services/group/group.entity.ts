import { getRandomId } from '~/helpers/helpers';

class Group {
  public id: string;
  public name: string;
  public createdAt: string;
  public tenantId: string;
  public workersIds: string[];
  public permissionsIds: string[];

  private constructor({
    id,
    name,
    createdAt,
    tenantId,
    workersIds,
    permissionsIds,
  }: {
    id: string;
    name: string;
    createdAt: string;
    tenantId: string;
    workersIds: string[];
    permissionsIds: string[];
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.tenantId = tenantId;
    this.workersIds = workersIds;
    this.permissionsIds = permissionsIds;
  }

  public static initialize({
    id,
    name,
    createdAt,
    tenantId,
    workersIds,
    permissionsIds,
  }: {
    id: string;
    name: string;
    createdAt: string;
    tenantId: string;
    workersIds: string[];
    permissionsIds: string[];
  }): Group {
    return new Group({
      id,
      name,
      createdAt,
      tenantId,
      workersIds,
      permissionsIds,
    });
  }

  public static createNew({
    name,
    tenantId,
    workersIds,
    permissionsIds,
  }: {
    name: string;
    tenantId: string;
    workersIds: string[];
    permissionsIds: string[];
  }): Group {
    return new Group({
      id: getRandomId(),
      name,
      createdAt: new Date().toISOString(),
      tenantId,
      workersIds,
      permissionsIds,
    });
  }
}

export { Group };
