import { Column, Row } from 'react-table';
import { WorkersTableHeader, WorkersTableAccessor } from 'common/enums/enums';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

const getColumns = (): Column[] => {
  return [
    {
      Header: WorkersTableHeader.WORKER_NAME,
      accessor: WorkersTableAccessor.WORKER_NAME,
      minWidth: 100,
      width: 400,
      sortType: 'basic',
    },
    {
      Header: WorkersTableHeader.GROUPS,
      accessor: WorkersTableAccessor.GROUPS,
      minWidth: 100,
      width: 400,
      sortType: 'basic',
    },
    {
      Header: WorkersTableHeader.CREATED_AT,
      accessor: WorkersTableAccessor.CREATED_AT,
      minWidth: 120,
      width: 200,
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id], rowB.values[id]);
      },
      Cell: ({ value }): string => {
        return getDateDecoratedWithAgo(new Date(value));
      },
    },
    {
      Header: WorkersTableHeader.ACTIONS,
      accessor: WorkersTableAccessor.ACTIONS,
      minWidth: 100,
      width: 150,
      disableSortBy: true,
    },
  ];
};

export { getColumns };
