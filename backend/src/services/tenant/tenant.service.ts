import { TenantResponseDto, TenantDto } from '~/common/types/types';
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

  public async getTenantById(id: string): Promise<TenantResponseDto | null> {
    const tenant = await this.#tenantRepository.getById(id);
    if (!tenant) {
      return null;
    }

    return {
      name: tenant.name,
    };
  }

  async create(name: string): Promise<TenantDto> {
    const tenant = TenantEntity.createNew({ name });
    return await this.#tenantRepository.create(tenant);
  }
}

export { Tenant };
