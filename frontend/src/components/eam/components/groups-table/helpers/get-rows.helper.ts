import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { ActionCell, PermissionsCell } from '../components/components';

type Row = {
  [GroupsTableAccessor.ID]: string;
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.WORKERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: JSX.Element;
  [GroupsTableAccessor.CREATED_AT]: string;
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
      [GroupsTableAccessor.ID]: id,
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.WORKERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: PermissionsCell(permissions),
      [GroupsTableAccessor.CREATED_AT]: createdAt,
      [GroupsTableAccessor.ACTIONS]: ActionCell(id, onGroupDelete),
    };
  });
};

export { getRows };
