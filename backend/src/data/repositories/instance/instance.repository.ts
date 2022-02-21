import { Instance as InstanceM } from '~/data/models/models';
import { Instance as InstanceEntity } from '~/services/instance/instance.entity';

type Constructor = {
  InstanceModel: typeof InstanceM;
};

class Instance {
  #InstanceModel: typeof InstanceM;

  constructor({ InstanceModel }: Constructor) {
    this.#InstanceModel = InstanceModel;
  }

  async create(instance: InstanceEntity): Promise<InstanceM> {
    const {
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
    } = instance;
    return this.#InstanceModel.query().insert({
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
    });
  }

  public static modelToEntity(model: InstanceM): InstanceEntity {
    const {
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
    } = model;

    return InstanceEntity.initialize({
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
    });
  }
}

export { Instance };
