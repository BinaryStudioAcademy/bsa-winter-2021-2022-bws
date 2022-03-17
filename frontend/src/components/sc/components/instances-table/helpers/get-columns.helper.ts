import {
  InstancesTableHeader,
  InstancesTableAccessor,
} from 'common/enums/enums';

type Column = {
  Header: string;
  accessor: string;
};

const getColumns = (): Column[] => {
  return [
    {
      Header: InstancesTableHeader.NAME,
      accessor: InstancesTableAccessor.NAME,
    },
    {
      Header: InstancesTableHeader.INSTANCE_ID,
      accessor: InstancesTableAccessor.INSTANCE_ID,
    },
    {
      Header: InstancesTableHeader.INSTANCE_STATE,
      accessor: InstancesTableAccessor.INSTANCE_STATE,
    },
    {
      Header: InstancesTableHeader.INSTANCE_TYPE,
      accessor: InstancesTableAccessor.INSTANCE_TYPE,
    },
    {
      Header: InstancesTableHeader.PUBLIC_IPV4_ADDRESS,
      accessor: InstancesTableAccessor.PUBLIC_IPV4_ADDRESS,
    },
    {
      Header: InstancesTableHeader.CREATED_AT,
      accessor: InstancesTableAccessor.CREATED_AT,
    },
    {
      Header: InstancesTableHeader.ACTIONS,
      accessor: InstancesTableAccessor.ACTIONS,
    },
  ];
};

export { getColumns };
