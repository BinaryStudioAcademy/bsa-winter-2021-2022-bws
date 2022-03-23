import {
  PermissionsTableAccessor,
  PermissionsTableHeader,
} from 'common/enums/enums';
import { Column } from 'react-table';

const getColumns = (): Column[] => {
  return [
    {
      Header: PermissionsTableHeader.ACTION,
      accessor: PermissionsTableAccessor.ACTION,
      minWidth: 30,
      width: 50,
    },
    {
      Header: PermissionsTableHeader.PERMISSIONS_NAME,
      accessor: PermissionsTableAccessor.PERMISSION_NAME,
      minWidth: 140,
      width: 300,
    },
    {
      Header: PermissionsTableHeader.CREATION_TIME,
      accessor: PermissionsTableAccessor.CREATION_TIME,
      minWidth: 120,
      width: 300,
    },
  ];
};

export { getColumns };
