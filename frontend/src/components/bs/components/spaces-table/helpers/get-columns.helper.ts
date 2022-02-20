import { SpacesTableHeader, SpacesTableAccessor } from 'common/enums/enums';

type Column = {
  Header: string;
  accessor: string;
};

const getColumns = (): Column[] => {
  return [
    {
      Header: SpacesTableHeader.SPACE_NAME,
      accessor: SpacesTableAccessor.SPACE_NAME,
    },
    {
      Header: SpacesTableHeader.CREATION_TIME,
      accessor: SpacesTableAccessor.CREATION_TIME,
    },
    {
      Header: SpacesTableHeader.ACTIONS,
      accessor: SpacesTableAccessor.ACTIONS,
    },
  ];
};

export { getColumns };
