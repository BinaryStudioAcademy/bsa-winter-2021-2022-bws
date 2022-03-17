import { InstancesTableAccessor } from 'common/enums/enums';
import { SCInstanceGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';
import { ActionCell } from '../components/components';

type Row = {
  [InstancesTableAccessor.NAME]: string;
  [InstancesTableAccessor.INSTANCE_TYPE]: string;
  [InstancesTableAccessor.CREATED_AT]: string;
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
      publicIpAddress,
      createdAt,
      instanceType,
      id,
      keyPairId: keyId,
    } = item;

    return {
      [InstancesTableAccessor.NAME]: name,
      [InstancesTableAccessor.INSTANCE_ID]: awsInstanceId,
      [InstancesTableAccessor.INSTANCE_TYPE]: instanceType,
      [InstancesTableAccessor.PUBLIC_IPV4_ADDRESS]: publicIpAddress,
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
