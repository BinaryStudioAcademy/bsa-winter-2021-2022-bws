import { GroupsTableHeader, GroupsTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';

const getColumns = (): Column[] => {
  return [
    {
      Header: GroupsTableHeader.ACTIONS,
      accessor: GroupsTableAccessor.ACTIONS,
      minWidth: 30,
      width: 50,
    },
    {
      Header: GroupsTableHeader.GROUP_NAME,
      accessor: GroupsTableAccessor.GROUP_NAME,
      minWidth: 150,
      width: 200,
    },
    {
      Header: GroupsTableHeader.WORKERS,
      accessor: GroupsTableAccessor.WORKERS,
      minWidth: 100,
      width: 100,
    },
    {
      Header: GroupsTableHeader.PERMISSIONS,
      accessor: GroupsTableAccessor.PERMISSIONS,
      minWidth: 150,
      width: 200,
    },
    {
      Header: GroupsTableHeader.CREATION_TIME,
      accessor: GroupsTableAccessor.CREATION_TIME,
      minWidth: 150,
      width: 150,
    },
  ];
};

export { getColumns };
