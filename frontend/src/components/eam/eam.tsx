import { FC } from 'react';
import { Button, IconButton } from 'components/common/common';
import { AppRoute, IconName } from 'common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { GroupsTable, WorkersTable, Tenant } from './components/components';
import styles from './styles.module.scss';

const EAM: FC = () => {
  const dispatch = useAppDispatch();

  const { id: tenantId } = useAppSelector(({ app }) => ({
    id: app.tenant?.id,
  }));

  useEffect(() => {
    if (!tenantId) {
      return;
    }

    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );

    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch, tenantId]);

  const handleGroupDelete = (id: string): void => {
    dispatch(eamActions.deleteGroup(id));
  };

  const handleWorkersReload = (): void => {
    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
  };
  const handleGroupsReload = (): void => {
    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <Tenant />
      <div className={styles.tableWrapper}>
        <WorkersTable>
          <div className={styles.buttonsBlock}>
            <IconButton
              onClick={handleWorkersReload}
              icon={IconName.RELOAD}
              label="Reload"
            />
            <Button
              className={styles.addWorkerBtn}
              to={AppRoute.EAM_CREATE_WORKER}
              label="Add Worker"
            />
          </div>
        </WorkersTable>
      </div>
      <GroupsTable onGroupDelete={handleGroupDelete}>
        <div className={styles.buttonsBlock}>
          <IconButton
            onClick={handleGroupsReload}
            icon={IconName.RELOAD}
            label="Reload"
          />
          <Button
            className={styles.addGroupBtn}
            to={AppRoute.EAM_CONFIGURATE_GROUP}
            label="Add Group"
          />
        </div>
      </GroupsTable>
    </div>
  );
};

export { EAM };
