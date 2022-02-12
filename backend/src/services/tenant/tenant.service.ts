import {
  EAMTenantCreateRequestDto,
  EAMTenantCreateResponseDto,
  EAMTenantByIdResponseDto,
} from '~/common/types/types';
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

  public async getTenantById(
    id: string,
  ): Promise<EAMTenantByIdResponseDto | null> {
    const tenant = await this.#tenantRepository.getById(id);

    if (!tenant) {
      return null;
    }

    return {
      id: tenant.id,
      name: tenant.name,
    };
  }

  async create(
    createDto: EAMTenantCreateRequestDto,
  ): Promise<EAMTenantCreateResponseDto> {
    const { name } = createDto;

    const tenant = TenantEntity.createNew({ name });

    await this.#tenantRepository.create(tenant);

    return {
      id: tenant.id,
      name: tenant.name,
    };
  }
}

export { Tenant };
