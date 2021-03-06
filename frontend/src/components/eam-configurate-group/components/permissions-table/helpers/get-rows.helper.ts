import { PermissionsTableAccessor } from 'common/enums/enums';
import { EAMPermissionGetAllItemResponseDto } from 'common/types/types';
import { SelectRowCell } from '../../components';

type Row = {
  [PermissionsTableAccessor.ID]: string;
  [PermissionsTableAccessor.PERMISSION_NAME]: string;
};

const getRows = (
  permissions: EAMPermissionGetAllItemResponseDto[],
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Row[] => {
  return permissions.map((item: EAMPermissionGetAllItemResponseDto) => {
    const { id, name, createdAt } = item;

    return {
      [PermissionsTableAccessor.ID]: id,
      [PermissionsTableAccessor.PERMISSION_NAME]: name,
      [PermissionsTableAccessor.CREATED_AT]: createdAt,
      [PermissionsTableAccessor.ACTION]: SelectRowCell(
        id,
        handleAddId,
        handleRemoveId,
        handleIsCheckedId,
      ),
    };
  });
};

export { getRows };
