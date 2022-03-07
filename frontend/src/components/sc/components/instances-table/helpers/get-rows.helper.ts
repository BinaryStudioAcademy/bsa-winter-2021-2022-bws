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
  onDeleteInstance,
}: {
  instances: SCInstanceGetByTenantResponseItemDto[];
  onDeleteInstance: (id: string) => void;
}): Row[] => {
  return instances.map((item) => {
    const { name, createdAt, instanceType, instanceId } = item;

    return {
      [InstancesTableAccessor.NAME]: name,
      [InstancesTableAccessor.INSTANCE_TYPE]: instanceType,
      [InstancesTableAccessor.CREATED_AT]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [InstancesTableAccessor.ACTIONS]: ActionCell(
        instanceId,
        onDeleteInstance,
      ),
    };
  });
};

export { getRows };
