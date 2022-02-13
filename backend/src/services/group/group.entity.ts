import { getRandomId } from '~/helpers/helpers';

class Group {
  public id: string;
  public name: string;
  public createdAt: Date;
  public tenantId: string;

  private constructor({
    id,
    name,
    createdAt,
    tenantId,
  }: {
    id: string;
    name: string;
    createdAt: Date;
    tenantId: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.tenantId = tenantId;
  }

  public static initialize({
    id,
    name,
    createdAt,
    tenantId,
  }: {
    id: string;
    name: string;
    createdAt: Date;
    tenantId: string;
  }): Group {
    return new Group({
      id,
      name,
      createdAt,
      tenantId,
    });
  }

  public static createNew({
    name,
    tenantId,
  }: {
    name: string;
    tenantId: string;
  }): Group {
    return new Group({
      id: getRandomId(),
      name,
      createdAt: new Date(),
      tenantId,
    });
  }
}

export { Group };
