import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';
import { ActionCell, PermissionsCell } from '../components/components';

type Row = {
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.WORKERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: JSX.Element;
  [GroupsTableAccessor.CREATION_TIME]: string;
  [GroupsTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  groups,
  onGroupDelete,
}: {
  groups: EAMGroupGetByTenantResponseItemDto[];
  onGroupDelete: (id: string) => void;
}): Row[] => {
  return groups.map((item) => {
    const { id, name, users, permissions: groupPermissions, createdAt } = item;
    const permissions = groupPermissions.map((item) => item.name);

    return {
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.WORKERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: PermissionsCell(permissions),
      [GroupsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [GroupsTableAccessor.ACTIONS]: ActionCell(id, onGroupDelete),
    };
  });
};

export { getRows };
