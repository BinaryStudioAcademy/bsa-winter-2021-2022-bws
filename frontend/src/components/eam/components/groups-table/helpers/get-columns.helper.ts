import { Column } from 'react-table';
import { GroupsTableHeader, GroupsTableAccessor } from 'common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: GroupsTableHeader.GROUP_NAME,
      accessor: GroupsTableAccessor.GROUP_NAME,
      minWidth: 140,
      width: 200,
    },
    {
      Header: GroupsTableHeader.WORKERS,
      accessor: GroupsTableAccessor.WORKERS,
      minWidth: 100,
      width: 120,
    },
    {
      Header: GroupsTableHeader.PERMISSIONS,
      accessor: GroupsTableAccessor.PERMISSIONS,
      minWidth: 140,
      width: 450,
    },
    {
      Header: GroupsTableHeader.CREATION_TIME,
      accessor: GroupsTableAccessor.CREATION_TIME,
      minWidth: 120,
      width: 200,
    },
    {
      Header: '',
      accessor: GroupsTableAccessor.ACTIONS,
      minWidth: 100,
      width: 150,
    },
  ];
};

export { getColumns };
