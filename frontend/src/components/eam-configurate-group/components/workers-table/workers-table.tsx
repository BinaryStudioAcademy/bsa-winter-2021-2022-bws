import React, { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
} from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import styles from './styles.module.scss';
import { Pagination } from 'common/enums/enums';
import { EAMGroupConfigurate as EAMGroupConfigurateActions } from 'store/actions';

type Props = {
  handleAddWorkerId: (id: string) => void;
  handleRemoveWorkerId: (id: string) => void;
  handleIsCheckedId: (id: string) => boolean;
  selectedWorkers: string[];
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
  hasGroup: boolean;
};

const WorkersTable: FC<Props> = ({
  selectedWorkers,
  handleAddWorkerId,
  handleRemoveWorkerId,
  handleIsCheckedId,
  hasGroup,
}) => {
  const dispatch = useAppDispatch();

  const { workers, tenantId, countItems } = useAppSelector(
    ({ app, EAMGroupConfigurate }) => ({
      workers: EAMGroupConfigurate.workers,
      tenantId: app.tenant?.id,
      countItems: EAMGroupConfigurate.workersCountItems,
    }),
  );

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      EAMGroupConfigurateActions.loadWorkers({
        tenantId: tenantId as string,
        from: from,
        count: count,
      }),
    );
  };

  const workerPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const data = useMemo(
    () =>
      getRows(
        workers,
        handleAddWorkerId,
        handleRemoveWorkerId,
        handleIsCheckedId,
      ),
    [workers, selectedWorkers],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <h3 className={styles.inputGroupTitle}>
        {hasGroup
          ? 'Edit workers in the group'
          : 'Add workers to the Group - Optional'}
      </h3>
      <Table
        className={styles.table}
        columns={columns}
        data={data}
        placeholder="No workers to display"
        pagination={workerPagination}
      />
    </div>
  );
};

export { WorkersTable };
