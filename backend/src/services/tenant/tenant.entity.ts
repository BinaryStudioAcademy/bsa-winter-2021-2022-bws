import { getRandomId } from '~/helpers/helpers';

class Tenant {
  public id: string;
  public name: string;
  public createdAt: Date;

  private constructor({
    id,
    name,
    createdAt,
  }: {
    id: string;
    name: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    name,
    createdAt,
  }: {
    id: string;
    name: string;
    createdAt: Date;
  }): Tenant {
    return new Tenant({
      id,
      name,
      createdAt,
    });
  }

  public static createNew({ name }: { name: string }): Tenant {
    return new Tenant({
      id: getRandomId(),
      name: name,
      createdAt: new Date(),
    });
  }
}

export { Tenant };
