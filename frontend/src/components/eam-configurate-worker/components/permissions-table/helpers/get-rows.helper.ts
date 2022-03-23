import { PermissionsTableAccessor } from 'common/enums/enums';
import { EAMPermissionGetAllItemResponseDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';
import { ActionCell } from '../../../helpers/helpers';

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
      [PermissionsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [PermissionsTableAccessor.ACTION]: ActionCell(
        id,
        handleAddId,
        handleRemoveId,
        handleIsCheckedId,
      ),
    };
  });
};

export { getRows };
