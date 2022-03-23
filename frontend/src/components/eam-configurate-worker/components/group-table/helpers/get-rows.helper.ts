import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';
import { ActionCell } from '../../../helpers/helpers';

type Row = {
  [GroupsTableAccessor.ID]: string;
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.WORKERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: string;
  [GroupsTableAccessor.CREATION_TIME]: string;
};

const getRows = (
  groups: EAMGroupGetByTenantResponseItemDto[],
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Row[] => {
  return groups.map((item: EAMGroupGetByTenantResponseItemDto) => {
    const { id, name, users, permissions, createdAt } = item;

    const permissionsNames = permissions.map((item) => item.name).join(', ');

    return {
      [GroupsTableAccessor.ID]: id,
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.WORKERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: permissionsNames,
      [GroupsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [GroupsTableAccessor.ACTIONS]: ActionCell(
        id,
        handleAddId,
        handleRemoveId,
        handleIsCheckedId,
      ),
    };
  });
};

export { getRows };
