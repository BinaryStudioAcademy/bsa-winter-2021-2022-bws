import { PermissionsTableAccessor } from 'common/enums/enums';
import { EAMPermissionGetAllItemResponseDto } from 'common/types/types';

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
      [PermissionsTableAccessor.CREATION_TIME]: createdAt,
    };
  });
};

export { getRows };
