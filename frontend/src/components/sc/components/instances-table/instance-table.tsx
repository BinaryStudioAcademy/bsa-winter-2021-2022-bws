import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
} from 'hooks/hooks';
import { Table, Button, IconButton } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus, Pagination, AppRoute, IconName } from 'common/enums/enums';
import { sc as scActions } from 'store/actions';
import styles from './styles.module.scss';

type Props = {
  onInstanceDelete: (id: string) => void;
  onKeyClick: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const InstancesTable: FC<Props> = ({ onInstanceDelete, onKeyClick }) => {
  const dispatch = useAppDispatch();
  const { instances, dataStatus, countItems } = useAppSelector(({ sc }) => ({
    instances: sc.instances,
    dataStatus: sc.dataStatus,
    countItems: sc.countItems,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      scActions.loadInstances({
        from: from,
        count: count,
      }),
    );
  };

  const spacePagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const handleReload = (): void => {
    dispatch(
      scActions.loadInstances({
        from: 0,
        count: 5,
      }),
    );
    spacePagination.onReload();
  };

  const data = useMemo(
    () => getRows({ instances, onInstanceDelete, onKeyClick }),
    [instances, onInstanceDelete],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Instances"
      placeholder="No instances to display"
      pagination={spacePagination}
      isLoading={isLoading}
    >
      <div className={styles.buttonsBlock}>
        <IconButton
          onClick={handleReload}
          icon={IconName.RELOAD}
          label="Reload"
          title="Refresh"
        />
        <Button
          className={styles.addInstanceBtn}
          to={AppRoute.SC_CONFIGURATE_INSTANCE}
          label="Add Instance"
        />
      </div>
    </Table>
  );
};

export { InstancesTable };
