import { group as groupRep } from '~/data/repositories/repositories';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  EAMGroupDeleteParamsDto,
} from '~/common/types/types';
import { Group as GroupEntity } from '~/services/group/group.entity';
import { EamError } from '~/exceptions/exceptions';
import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

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
  ): Promise<EAMGroupGetByTenantResponseDto> {
    const groups = await this.#groupRepository.getGroupsByTenant(filter);
    return { items: groups };
  }

  public async create({
    name,
    tenantId,
    workersIds,
    permissionsIds,
  }: EAMGroupCreateRequestDto): Promise<EAMGroupCreateResponseDto> {
    const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
      name,
      tenantId,
    );
    if (groupByName) {
      throw new EamError();
    }

    const group = GroupEntity.createNew({
      name,
      tenantId,
      workersIds,
      permissionsIds,
    });

    return this.#groupRepository.create(group);
  }

  public async delete({ id }: EAMGroupDeleteParamsDto): Promise<number> {
    const group = await this.#groupRepository.getGroupById(id);

    if (!group) {
      throw new EamError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.GROUP_DOES_NOT_EXIST,
      });
    }
    if (group.users.length) {
      throw new EamError({
        status: HttpCode.UNPROCESSABLE_ENTITY,
        message: ExceptionMessage.GROUP_NOT_EMPTY,
      });
    }

    return this.#groupRepository.delete(id);
  }
}

export { Group };
