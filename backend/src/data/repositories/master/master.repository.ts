import {
  Master as MasterM,
  Permission as PermissionM,
} from '~/data/models/models';
import { Master as MasterEntity } from '~/services/master/master.entity';
import { EAMMasterPermissionsItem } from '~/common/types/types';

type Constructor = {
  MasterModel: typeof MasterM;
  PermissionModel: typeof PermissionM;
};

class Master {
  #MasterModel: typeof MasterM;
  #PermissionModel: typeof PermissionM;

  constructor({ MasterModel, PermissionModel }: Constructor) {
    this.#MasterModel = MasterModel;
    this.#PermissionModel = PermissionModel;
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

    const permissions: EAMMasterPermissionsItem[] =
      await this.#PermissionModel.query();
    const permissionName: string[] = permissions.map(
      (permission) => permission.name,
    );

    return Master.modelToEntity(master, permissionName);
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

    const permissions: EAMMasterPermissionsItem[] =
      await this.#PermissionModel.query();
    const permissionName: string[] = permissions.map(
      (permission) => permission.name,
    );

    return Master.modelToEntity(master, permissionName);
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

  public static modelToEntity(
    model: MasterM,
    permissions: string[],
  ): MasterEntity {
    const { id, name, email, passwordHash, passwordSalt, tenantId } = model;

    return MasterEntity.initialize({
      id,
      name,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(model.createdAt),
      tenantId,
      permissions,
    });
  }
}

export { Master };
