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
import { eam as eamActions } from 'store/actions';
import styles from './styles.module.scss';

type Props = {
  onGroupDelete: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const GroupsTable: FC<Props> = ({ onGroupDelete }) => {
  const dispatch = useAppDispatch();

  const { groups, groupsDataStatus, countItems, tenantId } = useAppSelector(
    ({ app, eam }) => ({
      groups: eam.groups,
      groupsDataStatus: eam.groupsDataStatus,
      countItems: eam.groupsCountAll,
      tenantId: app.tenant?.id,
    }),
  );

  const isLoading = groupsDataStatus === DataStatus.PENDING;

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: from,
        count: count,
      }),
    );
  };

  const groupPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const handleGroupsReload = (): void => {
    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
    groupPagination.onReload();
  };

  const data = useMemo(() => getRows({ groups, onGroupDelete }), [groups]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Groups"
      placeholder="No groups to display"
      dataTestid="eam-group-table"
      pagination={groupPagination}
      isLoading={isLoading}
    >
      <div className={styles.buttonsBlock}>
        <IconButton
          onClick={handleGroupsReload}
          icon={IconName.RELOAD}
          label="Reload"
          title="Refresh"
        />
        <Button
          className={styles.addGroupBtn}
          to={AppRoute.EAM_CONFIGURATE_GROUP}
          label="Add Group"
        />
      </div>
    </Table>
  );
};

export { GroupsTable };
