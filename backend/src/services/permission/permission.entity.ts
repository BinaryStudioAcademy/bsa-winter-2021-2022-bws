class Permission {
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
  }): Permission {
    return new Permission({
      id,
      name,
      createdAt,
    });
  }
}

export { Permission };
