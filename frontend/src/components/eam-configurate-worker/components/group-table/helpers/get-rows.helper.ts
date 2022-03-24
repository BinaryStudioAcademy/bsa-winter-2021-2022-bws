import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';
import { ActionCell, PermissionsCell } from '../../../helpers/helpers';

type Row = {
  [GroupsTableAccessor.ID]: string;
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.WORKERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: JSX.Element;
  [GroupsTableAccessor.CREATION_TIME]: string;
  [GroupsTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = (
  groups: EAMGroupGetByTenantResponseItemDto[],
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Row[] => {
  return groups.map((item: EAMGroupGetByTenantResponseItemDto) => {
    const { id, name, users, permissions, createdAt } = item;

    const permissionsName = permissions.map((item) => item.name);

    return {
      [GroupsTableAccessor.ID]: id,
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.WORKERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: PermissionsCell(permissionsName),
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
