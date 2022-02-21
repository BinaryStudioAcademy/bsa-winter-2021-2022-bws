import { PermissionsTableAccessor } from 'common/enums/enums';
import { EAMPermissionGetAllItemResponseDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [PermissionsTableAccessor.ID]: string;
  [PermissionsTableAccessor.PERMISSION_NAME]: string;
};

const getRows = (permissions: EAMPermissionGetAllItemResponseDto[]): Row[] => {
  return permissions.map((item: EAMPermissionGetAllItemResponseDto) => {
    const { id, name, createdAt } = item;

    return {
      [PermissionsTableAccessor.ID]: id,
      [PermissionsTableAccessor.PERMISSION_NAME]: name,
      [PermissionsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
    };
  });
};

export { getRows };
