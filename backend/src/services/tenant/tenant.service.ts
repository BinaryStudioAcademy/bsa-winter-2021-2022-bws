import { TenantResponseDto } from '~/common/types/types';
import { tenant as tenantRep } from '~/data/repositories/repositories';
import { Tenant as TenantEntity } from './tenant.entity';

type Constructor = {
  tenantRepository: typeof tenantRep;
};

class Tenant {
  #tenantRepository: typeof tenantRep;

  constructor({ tenantRepository }: Constructor) {
    this.#tenantRepository = tenantRepository;
  }

  async create(name: string): Promise<TenantResponseDto> {
    const tenant = TenantEntity.createNew({ name });
    return await this.#tenantRepository.create(tenant);
  }
}

export { Tenant };
