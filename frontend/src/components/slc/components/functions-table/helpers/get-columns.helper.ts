import { Column, Row } from 'react-table';
import {
  FunctionsTableHeader,
  FunctionsTableAccessor,
} from 'common/enums/enums';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

const getColumns = (): Column[] => {
  return [
    {
      Header: FunctionsTableHeader.FUNCTION_NAME,
      accessor: FunctionsTableAccessor.FUNCTION_NAME,
      minWidth: 200,
      width: 400,
      sortType: 'basic',
    },
    {
      Header: FunctionsTableHeader.CREATION_TIME,
      accessor: FunctionsTableAccessor.CREATION_TIME,
      minWidth: 150,
      width: 300,
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id], rowB.values[id]);
      },
      Cell: ({ value }): string => {
        return getDateDecoratedWithAgo(new Date(value));
      },
    },
    {
      Header: FunctionsTableHeader.UPDATION_TIME,
      accessor: FunctionsTableAccessor.UPDATION_TIME,
      minWidth: 150,
      width: 300,
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id], rowB.values[id]);
      },
      Cell: ({ value }): string => {
        return getDateDecoratedWithAgo(new Date(value));
      },
    },
    {
      Header: FunctionsTableHeader.ACTIONS,
      accessor: FunctionsTableAccessor.ACTIONS,
      minWidth: 100,
      width: 150,
      disableSortBy: true,
    },
  ];
};

export { getColumns };
