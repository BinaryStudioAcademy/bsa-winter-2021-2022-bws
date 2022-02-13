import { getRandomId } from '~/helpers/helpers';

class Worker {
  public id: string;
  public name: string;
  public passwordHash: string;
  public passwordSalt: string;
  public tenantId: string;
  public groupIds: string[];
  public createdAt: Date;

  private constructor({
    id,
    name,
    passwordHash,
    passwordSalt,
    tenantId,
    groupIds,
    createdAt,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
    groupIds: string[];
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.tenantId = tenantId;
    this.groupIds = groupIds;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    name,
    passwordHash,
    passwordSalt,
    tenantId,
    groupIds,
    createdAt,
  }: {
    id: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
    tenantId: string;
    groupIds: string[];
    createdAt: Date;
  }): Worker {
    return new Worker({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      createdAt,
    });
  }
  public static createNew({
    name,
    passwordHash,
    passwordSalt,
    groupIds,
    tenantId,
  }: {
    name: string;
    passwordHash: string;
    passwordSalt: string;
    groupIds: string[];
    tenantId: string;
  }): Worker {
    return new Worker({
      id: getRandomId(),
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      createdAt: new Date(),
    });
  }
}

export { Worker };
