import { Column } from 'react-table';
import {
  InstancesTableHeader,
  InstancesTableAccessor,
} from 'common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: InstancesTableHeader.NAME,
      accessor: InstancesTableAccessor.NAME,
      minWidth: 200,
      width: 230,
    },
    {
      Header: InstancesTableHeader.INSTANCE_ID,
      accessor: InstancesTableAccessor.INSTANCE_ID,
      minWidth: 150,
      width: 200,
    },
    {
      Header: InstancesTableHeader.INSTANCE_STATE,
      accessor: InstancesTableAccessor.INSTANCE_STATE,
      minWidth: 100,
      width: 150,
    },
    {
      Header: InstancesTableHeader.OS,
      accessor: InstancesTableAccessor.OS,
      minWidth: 100,
      width: 200,
    },
    {
      Header: InstancesTableHeader.INSTANCE_TYPE,
      accessor: InstancesTableAccessor.INSTANCE_TYPE,
      minWidth: 100,
      width: 150,
    },
    {
      Header: InstancesTableHeader.PUBLIC_IPV4_ADDRESS,
      accessor: InstancesTableAccessor.PUBLIC_IPV4_ADDRESS,
      minWidth: 150,
      width: 200,
    },
    {
      Header: InstancesTableHeader.CREATED_AT,
      accessor: InstancesTableAccessor.CREATED_AT,
      minWidth: 130,
      width: 150,
    },
    {
      Header: InstancesTableHeader.ACTIONS,
      accessor: InstancesTableAccessor.ACTIONS,
      minWidth: 150,
      width: 150,
    },
  ];
};

export { getColumns };
