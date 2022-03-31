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
import { bs as bsActions } from 'store/actions';
import styles from './styles.module.scss';

type Props = {
  onSpaceDelete: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const SpacesTable: FC<Props> = ({ onSpaceDelete }) => {
  const dispatch = useAppDispatch();

  const { spaces, dataStatus, countItems } = useAppSelector(({ bs }) => ({
    spaces: bs.spaces,
    dataStatus: bs.dataStatus,
    countItems: bs.countItems,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      bsActions.loadSpaces({
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

  const handleSpacesReload = (): void => {
    dispatch(
      bsActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
    spacePagination.onReload();
  };

  const data = useMemo(() => getRows({ spaces, onSpaceDelete }), [spaces]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        title="Spaces"
        placeholder="No spaces to display"
        pagination={spacePagination}
        isLoading={isLoading}
      >
        <div className={styles.buttonsBlock}>
          <IconButton
            onClick={handleSpacesReload}
            icon={IconName.RELOAD}
            label="Reload"
            title="Refresh"
          />
          <Button
            className={styles.addSpaceBtn}
            to={AppRoute.BS_CREATE_SPACE}
            label="Add Space"
          />
        </div>
      </Table>
    </>
  );
};

export { SpacesTable };
