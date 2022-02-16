import { group as groupRep } from '~/data/repositories/repositories';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseItemDto,
} from '~/common/types/types';
import { Group as GroupEntity } from '~/services/group/group.entity';
import { InvalidGroupNameError } from '~/exceptions/exceptions';

type Constructor = {
  groupRepository: typeof groupRep;
};

class Group {
  #groupRepository: typeof groupRep;

  constructor({ groupRepository }: Constructor) {
    this.#groupRepository = groupRepository;
  }

  public async getGroupsByTenant(
    filter: EAMGroupGetByTenantRequestParamsDto,
  ): Promise<{
    items: EAMGroupGetByTenantResponseItemDto[];
    itemsCount: number;
  }> {
    const groups = await this.#groupRepository.getGroupsByTenant(filter);
    const groupsCount = await this.#groupRepository.getCountGroups();
    return { items: groups, itemsCount: groupsCount };
  }

  public async create({
    name,
    tenantId,
  }: EAMGroupCreateRequestDto): Promise<EAMGroupCreateResponseDto> {
    const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
      name,
      tenantId,
    );
    if (groupByName) {
      throw new InvalidGroupNameError();
    }

    const group = GroupEntity.createNew({ name, tenantId });

    return this.#groupRepository.create(group);
  }
}

export { Group };
