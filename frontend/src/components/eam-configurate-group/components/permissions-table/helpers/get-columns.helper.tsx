import {
  PermissionsTableAccessor,
  PermissionsTableHeader,
} from 'common/enums/enums';
import { Column } from 'react-table';
import { SelectRowCell } from '../../../helpers/helpers';

const getColumns = (
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Column[] => {
  return [
    {
      Header: '',
      accessor: 'check',
      Cell: ({ row }): JSX.Element =>
        SelectRowCell(row, handleAddId, handleRemoveId, handleIsCheckedId),
    },
    {
      Header: PermissionsTableHeader.PERMISSIONS_NAME,
      accessor: PermissionsTableAccessor.PERMISSION_NAME,
    },
  ];
};

export { getColumns };
