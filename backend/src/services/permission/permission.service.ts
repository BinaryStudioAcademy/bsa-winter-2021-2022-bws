import { permission as permissionRep } from '~/data/repositories/repositories';
import { EAMPermissionGetAllResponseDto } from '~/common/types/types';

type Constructor = {
  permissionRepository: typeof permissionRep;
};

class Permission {
  #permissionRepository: typeof permissionRep;

  constructor({ permissionRepository }: Constructor) {
    this.#permissionRepository = permissionRepository;
  }

  async getAll(): Promise<EAMPermissionGetAllResponseDto> {
    const permissions = await this.#permissionRepository.getAll();
    return {
      items: permissions,
    };
  }
}

export { Permission };
