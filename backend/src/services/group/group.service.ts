import { group as groupRep } from '~/data/repositories/repositories';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  EamGroupGetByIdResponseDto,
  EAMGroupDeleteParamsDto,
} from '~/common/types/types';
import { Group as GroupEntity } from '~/services/group/group.entity';
import { EAMError } from '~/exceptions/exceptions';
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
    const countItems = await this.#groupRepository.getCount(filter);
    return { items: groups, countItems };
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
      throw new EAMError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.GROUP_EXISTS,
      });
    }

    const group = GroupEntity.createNew({
      name,
      tenantId,
      workersIds,
      permissionsIds,
    });

    return this.#groupRepository.create(group);
  }

  public async delete({ id }: EAMGroupDeleteParamsDto): Promise<void> {
    const group = await this.#groupRepository.getGroupById(id);

    if (!group) {
      throw new EAMError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.GROUP_NOT_FOUND,
      });
    }
    const hasUsers = Boolean(group.workersIds.length);
    if (hasUsers) {
      throw new EAMError({
        status: HttpCode.UNPROCESSABLE_ENTITY,
        message: ExceptionMessage.GROUP_NOT_EMPTY,
      });
    }

    await this.#groupRepository.delete(id);
  }

  public async update(
    id: string,
    { name, tenantId, workersIds, permissionsIds }: EAMGroupCreateRequestDto,
  ): Promise<EAMGroupCreateResponseDto | null> {
    const group = await this.#groupRepository.getGroupById(id);

    if (!group) {
      throw new EAMError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.GROUP_NOT_FOUND,
      });
    }
    if (name !== group.name) {
      const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
        name,
        tenantId,
      );

      if (groupByName) {
        throw new EAMError({
          status: HttpCode.BAD_REQUEST,
          message: ExceptionMessage.GROUP_EXISTS,
        });
      }

      group.setName(name);
    }
    group.setWorkersIds(workersIds);
    group.setPermissionsIds(permissionsIds);

    await this.#groupRepository.save(group);

    return group;
  }

  public async getGroupById(
    id: string,
  ): Promise<EamGroupGetByIdResponseDto | null> {
    return this.#groupRepository.getGroupById(id);
  }
}

export { Group };
