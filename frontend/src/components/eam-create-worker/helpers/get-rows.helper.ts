import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [GroupsTableAccessor.GROUP_NAME]: string;
};

const getRows = (groups: EAMGroupGetByTenantResponseItemDto[]): Row[] => {
  return groups.map((item: EAMGroupGetByTenantResponseItemDto) => {
    const { id, name, users, createdAt } = item;

    const userName = users.map((item) => item.name).join(', ');

    return {
      [GroupsTableAccessor.ID]: id,
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.USERS]: userName,
      [GroupsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
    };
  });
};

export { getRows };
