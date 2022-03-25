import { FC } from 'react';
import { AppRoute, IconName } from 'common/enums/enums';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { sc as scActions } from 'store/actions';
import { InstancesTable } from './components/components';
import { Button, IconButton } from 'components/common/common';
import styles from './styles.module.scss';

const SC: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      scActions.loadInstances({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleDeleteInstance = (id: string): void => {
    dispatch(scActions.deleteInstance(id));
  };

  const handleCopyKey = (keyId: string): void => {
    dispatch(scActions.loadSshKey(keyId));
  };

  const handleReload = (): void => {
    dispatch(
      scActions.loadInstances({
        from: 0,
        count: 5,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SC - <br />
        Server Computing
      </h2>
      <div className={styles.tableWrapper}>
        <InstancesTable
          onInstanceDelete={handleDeleteInstance}
          onKeyClick={handleCopyKey}
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
        </InstancesTable>
      </div>
    </div>
  );
};

export { SC };
