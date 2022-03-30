import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
} from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import { eam as eamActions } from 'store/actions';
import { DataStatus, Pagination } from 'common/enums/enums';

type Props = {
  onWorkerDelete: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const WorkersTable: FC<Props> = ({ children, onWorkerDelete }) => {
  const dispatch = useAppDispatch();

  const { workers, countItems, tenantId, workersDataStatus } = useAppSelector(
    ({ app, eam }) => ({
      workers: eam.workers,
      countItems: eam.workersCountAll,
      tenantId: app.tenant?.id,
      workersDataStatus: eam.workersDataStatus,
    }),
  );

  const isLoading = workersDataStatus === DataStatus.PENDING;

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: from,
        count: count,
      }),
    );
  };

  const workersPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const data = useMemo(() => getRows({ workers, onWorkerDelete }), [workers]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Workers"
      placeholder="No workers to display"
      pagination={workersPagination}
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { WorkersTable };
