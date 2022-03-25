import { AppRoute, IconName } from 'common/enums/enums';
import { Button, IconButton } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { bs as bsActions } from 'store/actions';

const BS: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      bsActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleSpaceDelete = (id: string): void => {
    dispatch(bsActions.deleteSpace(id));
  };

  const handleWorkersReload = (): void => {
    dispatch(
      bsActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <SpacesTable onSpaceDelete={handleSpaceDelete}>
          <div className={styles.buttonsBlock}>
            <IconButton
              onClick={handleWorkersReload}
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
        </SpacesTable>
      </div>
    </div>
  );
};

export { BS };
