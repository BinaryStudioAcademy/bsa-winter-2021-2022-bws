import { getRandomId } from '~/helpers/helpers';

class Space {
  public id: string;
  public name: string;
  public createdAt: string;
  public createdBy: string;
  public awsS3Id: string;

  private constructor({
    id,
    name,
    createdAt,
    createdBy,
    awsS3Id,
  }: {
    id: string;
    name: string;
    createdAt: string;
    createdBy: string;
    awsS3Id: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.awsS3Id = awsS3Id;
  }

  public static initialize({
    id,
    name,
    createdAt,
    createdBy,
    awsS3Id,
  }: {
    id: string;
    name: string;
    createdAt: string;
    createdBy: string;
    awsS3Id: string;
  }): Space {
    return new Space({
      id,
      name,
      createdAt,
      createdBy,
      awsS3Id,
    });
  }

  public static createNew({
    name,
    createdBy,
  }: {
    name: string;
    createdBy: string;
  }): Space {
    return new Space({
      id: getRandomId(),
      name,
      createdAt: new Date().toISOString(),
      createdBy,
      awsS3Id: `arn:aws:s3:::${name}`,
    });
  }
}

export { Space };
