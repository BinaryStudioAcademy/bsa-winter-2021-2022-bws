import { InstancesTableAccessor } from 'common/enums/enums';
import { SCInstanceGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';
import { ActionCell, StateCell } from '../components/components';

type Row = {
  [InstancesTableAccessor.NAME]: string;
  [InstancesTableAccessor.INSTANCE_ID]: string;
  [InstancesTableAccessor.INSTANCE_STATE]: JSX.Element;
  [InstancesTableAccessor.INSTANCE_TYPE]: string;
  [InstancesTableAccessor.OS]: string;
  [InstancesTableAccessor.CREATED_AT]: string;
  [InstancesTableAccessor.PUBLIC_IPV4_ADDRESS]: string;
  [InstancesTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  instances,
  onInstanceDelete,
  onKeyClick,
}: {
  instances: SCInstanceGetByTenantResponseItemDto[];
  onInstanceDelete: (id: string) => void;
  onKeyClick: (id: string) => void;
}): Row[] => {
  return instances.map((item) => {
    const {
      name,
      awsInstanceId,
      state,
      publicIpAddress,
      createdAt,
      instanceType,
      id,
      keyPairId: keyId,
      operationSystem,
    } = item;

    return {
      [InstancesTableAccessor.NAME]: name,
      [InstancesTableAccessor.INSTANCE_ID]: awsInstanceId,
      [InstancesTableAccessor.INSTANCE_STATE]: StateCell(state),
      [InstancesTableAccessor.INSTANCE_TYPE]: instanceType,
      [InstancesTableAccessor.OS]: operationSystem.name.split('-').join(' '),
      [InstancesTableAccessor.PUBLIC_IPV4_ADDRESS]: publicIpAddress ?? '-',
      [InstancesTableAccessor.CREATED_AT]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [InstancesTableAccessor.ACTIONS]: ActionCell({
        id,
        keyId,
        onInstanceDelete,
        onKeyClick,
      }),
    };
  });
};

export { getRows };
