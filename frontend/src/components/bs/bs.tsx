import { AppRoute } from 'common/enums/enums';
import { Button } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { bs as bsActions } from 'store/actions';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';

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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <SpacesTable>
          <Button
            className={styles.addSpaceBtn}
            to={AppRoute.BS_CREATE_SPACE}
            label="Add Space"
          />
        </SpacesTable>
      </div>
    </div>
  );
};

export { BS };
