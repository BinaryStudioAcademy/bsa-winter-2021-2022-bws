import { FC } from 'react';
import { EntityType } from 'common/enums/enums';
import { useAppDispatch, useEffect, useState } from 'hooks/hooks';
import { InstancesTable } from './components/components';
import { ConfirmDeletePopup } from 'components/common/common';
import { sc as scActions } from 'store/actions';
import styles from './styles.module.scss';

const SC: FC = () => {
  const dispatch = useAppDispatch();
  const [currentInstanceId, setCurrentInstanceId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    dispatch(
      scActions.loadInstances({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleDeleteInstance = (id: string): void => setCurrentInstanceId(id);

  const handleCancelDelete = (): void => setCurrentInstanceId(null);

  const handleConfirmDelete = (): void => {
    dispatch(scActions.deleteInstance(currentInstanceId as string));
    setCurrentInstanceId(null);
  };

  const handleCopyKey = (keyId: string): void => {
    dispatch(scActions.loadSshKey(keyId));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          SC - <br />
          Server Computing
        </h2>
        <div className={styles.tableWrapper}>
          <InstancesTable
            onInstanceDelete={handleDeleteInstance}
            onKeyClick={handleCopyKey}
          />
        </div>
      </div>
      <ConfirmDeletePopup
        isOpen={Boolean(currentInstanceId)}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        entityType={EntityType.INSTANCE}
      />
    </>
  );
};

export { SC };
