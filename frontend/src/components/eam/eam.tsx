import { FC } from 'react';
import { ConfirmDeletePopup } from 'components/common/common';
import { EntityType } from 'common/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { GroupsTable, Tenant, WorkersTable } from './components/components';
import styles from './styles.module.scss';

const EAM: FC = () => {
  const dispatch = useAppDispatch();
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const [currentWorkerId, setCurrentWorkerId] = useState<string | null>(null);

  const { tenantId } = useAppSelector(({ app }) => ({
    tenantId: app.tenant?.id,
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

  const handleGroupDelete = (id: string): void => setCurrentGroupId(id);

  const handleWorkersDelete = (id: string): void => setCurrentWorkerId(id);

  const handleCancelDelete = (): void =>
    currentGroupId ? setCurrentGroupId(null) : setCurrentWorkerId(null);

  const handleConfirmDelete = (): void => {
    if (currentGroupId) {
      dispatch(eamActions.deleteGroup(currentGroupId as string));
      setCurrentGroupId(null);
    } else {
      dispatch(eamActions.deleteWorker(currentWorkerId as string));
      setCurrentWorkerId(null);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          EAM - <br />
          Entity Access Management
        </h2>
        <Tenant />
        <div className={styles.tableWrapper}>
          <WorkersTable onWorkerDelete={handleWorkersDelete} />
        </div>
        <GroupsTable onGroupDelete={handleGroupDelete} />
      </div>
      <ConfirmDeletePopup
        isOpen={Boolean(currentGroupId || currentWorkerId)}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        entityType={currentGroupId ? EntityType.GROUP : EntityType.WORKER}
      />
    </>
  );
};

export { EAM };
