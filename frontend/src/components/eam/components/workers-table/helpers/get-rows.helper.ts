import { WorkersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';
import { ActionCell } from '../components/components';

type Row = {
  [WorkersTableAccessor.WORKER_NAME]: string;
  [WorkersTableAccessor.GROUPS]: string;
  [WorkersTableAccessor.CREATED_AT]: string;
  [WorkersTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  workers,
  onWorkerDelete,
}: {
  workers: EAMWorkerGetAllItemResponseDto[];
  onWorkerDelete: (id: string) => void;
}): Row[] => {
  return workers.map((item) => {
    const { id, name, groups, createdAt } = item;

    const groupsName = groups.map((item) => item.name).join(', ');

    return {
      [WorkersTableAccessor.WORKER_NAME]: name,
      [WorkersTableAccessor.GROUPS]: groupsName,
      [WorkersTableAccessor.CREATED_AT]: createdAt,
      [WorkersTableAccessor.ACTIONS]: ActionCell(id, onWorkerDelete),
    };
  });
};

export { getRows };
