import { getRandomId } from '~/helpers/helpers';

class BSObject {
  public id: string;
  public name: string;
  public sizeInBytes: number;
  public createdAt: Date;
  public spaceId: string;
  public uploadedBy: string;
  public awsObjectKey: string;

  private constructor({
    id,
    name,
    sizeInBytes,
    createdAt,
    spaceId,
    uploadedBy,
    awsObjectKey,
  }: {
    id: string;
    name: string;
    sizeInBytes: number;
    createdAt: Date;
    spaceId: string;
    uploadedBy: string;
    awsObjectKey: string;
  }) {
    this.id = id;
    this.name = name;
    this.sizeInBytes = sizeInBytes;
    this.createdAt = createdAt;
    this.spaceId = spaceId;
    this.uploadedBy = uploadedBy;
    this.awsObjectKey = awsObjectKey;
  }

  public static initialize({
    id,
    name,
    sizeInBytes,
    createdAt,
    spaceId,
    uploadedBy,
    awsObjectKey,
  }: {
    id: string;
    name: string;
    sizeInBytes: number;
    createdAt: Date;
    spaceId: string;
    uploadedBy: string;
    awsObjectKey: string;
  }): BSObject {
    return new BSObject({
      id,
      name,
      sizeInBytes,
      createdAt,
      spaceId,
      uploadedBy,
      awsObjectKey,
    });
  }

  public static createNew({
    name,
    sizeInBytes,
    spaceId,
    uploadedBy,
    awsObjectKey,
  }: {
    name: string;
    sizeInBytes: number;
    spaceId: string;
    uploadedBy: string;
    awsObjectKey: string;
  }): BSObject {
    return new BSObject({
      id: getRandomId(),
      name,
      sizeInBytes,
      createdAt: new Date(),
      spaceId,
      uploadedBy,
      awsObjectKey,
    });
  }
}

export { BSObject };
