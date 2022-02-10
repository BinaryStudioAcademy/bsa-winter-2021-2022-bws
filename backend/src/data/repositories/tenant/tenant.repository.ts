import { Tenant as TenantM } from '~/data/models/models';
import { Tenant as TenantEntity } from '~/services/tenant/tenant.entity';

type Constructor = {
  TenantModel: typeof TenantM;
};

class Tenant {
  #TenantModel: typeof TenantM;

  constructor({ TenantModel }: Constructor) {
    this.#TenantModel = TenantModel;
  }

  async create(tenant: TenantEntity): Promise<TenantM> {
    const { id, name } = tenant;

    return this.#TenantModel.query().insert({
      id,
      name,
      createdAt: tenant.createdAt.toISOString(),
    });
  }
}

export { Tenant };
