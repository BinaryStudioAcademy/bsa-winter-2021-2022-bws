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
import { slc as slcActions } from 'store/actions';
import styles from './styles.module.scss';

type Props = {
  onFunctionDelete: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const FunctionsTable: FC<Props> = ({ onFunctionDelete }) => {
  const { functions, dataStatus, countItems } = useAppSelector(({ slc }) => ({
    functions: slc.functions,
    dataStatus: slc.dataStatus,
    countItems: slc.countItems,
  }));

  const isLoading = dataStatus === DataStatus.PENDING;
  const dispatch = useAppDispatch();
  const handleLoad = (from: number, count: number): void => {
    dispatch(
      slcActions.loadFunctions({
        from: from,
        count: count,
      }),
    );
  };

  const functionPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const handleFunctionReload = (): void => {
    dispatch(
      slcActions.loadFunctions({
        from: 0,
        count: 5,
      }),
    );
    functionPagination.onReload();
  };

  const data = useMemo(
    () => getRows({ slcFunctions: functions, onFunctionDelete }),
    [functions],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Functions"
      placeholder="No functions to display"
      pagination={functionPagination}
      isLoading={isLoading}
    >
      <div className={styles.buttonsBlock}>
        <IconButton
          title="Refresh"
          onClick={handleFunctionReload}
          icon={IconName.RELOAD}
          label="Reload"
        />
        <Button
          className={styles.addFunctionBtn}
          to={AppRoute.SLC_CONFIGURATE_FUNCTION}
          label="Create function"
        />
      </div>
    </Table>
  );
};

export { FunctionsTable };
