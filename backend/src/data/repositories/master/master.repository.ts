import { Master as MasterM } from '~/data/models/models';
import { Master as MasterEntity } from '~/services/master/master.entity';

type Constructor = {
  MasterModel: typeof MasterM;
};

class Master {
  #MasterModel: typeof MasterM;

  constructor({ MasterModel }: Constructor) {
    this.#MasterModel = MasterModel;
  }

  async getByEmail(email: string): Promise<MasterEntity | null> {
    const master = await this.#MasterModel
      .query()
      .select()
      .where({ email })
      .first();

    if (!master) {
      return null;
    }

    return Master.modelToEntity(master);
  }

  async getById(id: string): Promise<MasterEntity | null> {
    const master = await this.#MasterModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!master) {
      return null;
    }

    return Master.modelToEntity(master);
  }

  async create(master: MasterEntity): Promise<MasterM> {
    const { id, name, email, passwordHash, passwordSalt, tenantId } = master;

    return this.#MasterModel.query().insert({
      id,
      name,
      email,
      passwordHash,
      passwordSalt,
      createdAt: master.createdAt.toISOString(),
      tenantId,
    });
  }

  public static modelToEntity(model: MasterM): MasterEntity {
    const { id, name, email, passwordHash, passwordSalt, tenantId } = model;

    return MasterEntity.initialize({
      id,
      name,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(model.createdAt),
      tenantId,
    });
  }
}

export { Master };
