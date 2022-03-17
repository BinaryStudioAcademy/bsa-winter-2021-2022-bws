import { getRandomId } from '~/helpers/helpers';

class Instance {
  public id: string;
  public name: string;
  public createdAt: string;
  public keyPairId: string;
  public username: string;
  public hostname: string;
  public operationSystemId: string;
  public createdBy: string;
  public awsInstanceId: string;
  public tenantId: string;
  public state: string;

  private constructor({
    id,
    name,
    createdAt,
    keyPairId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
    tenantId,
    state,
  }: {
    id: string;
    name: string;
    createdAt: string;
    keyPairId: string;
    username: string;
    hostname: string;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
    tenantId: string;
    state: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.keyPairId = keyPairId;
    this.username = username;
    this.hostname = hostname;
    this.operationSystemId = operationSystemId;
    this.createdBy = createdBy;
    this.awsInstanceId = awsInstanceId;
    this.tenantId = tenantId;
    this.state = state;
  }

  public static initialize({
    id,
    name,
    createdAt,
    keyPairId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
    tenantId,
    state,
  }: {
    id: string;
    name: string;
    createdAt: string;
    keyPairId: string;
    username: string;
    hostname: string;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
    tenantId: string;
    state: string;
  }): Instance {
    return new Instance({
      id,
      name,
      createdAt,
      keyPairId,
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state,
    });
  }

  public static createNew({
    name,
    keyPairId,
    username,
    hostname,
    operationSystemId,
    createdBy,
    awsInstanceId,
    tenantId,
    state,
  }: {
    name: string;
    keyPairId: string;
    username: string;
    hostname: string;
    operationSystemId: string;
    createdBy: string;
    awsInstanceId: string;
    tenantId: string;
    state: string;
  }): Instance {
    return new Instance({
      id: getRandomId(),
      name,
      keyPairId,
      createdAt: new Date().toISOString(),
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state,
    });
  }
}

export { Instance };
