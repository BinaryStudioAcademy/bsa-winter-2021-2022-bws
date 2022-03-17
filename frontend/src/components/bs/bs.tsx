import { AppRoute, IconName } from 'common/enums/enums';
import { Button, IconButton } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { bs as bsActions } from 'store/actions';

const BS: FC = () => {
  const dispatch = useAppDispatch();
  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const files = e.currentTarget.files;
    if (files) {
      formData.append('file', files[0]);
    }
    const spaceId = '5148d1ab-3929-4403-8922-f5d86cddbc11';
    fetch(`http://localhost:3001/api/v1/bs/spaces/${spaceId}/objects`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then((response) => response.json());
  };

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
      <input type="file" onChange={changeHandler} />
      <div className={styles.tableWrapper}>
        <SpacesTable onSpaceDelete={handleSpaceDelete}>
          <div className={styles.buttonsBlock}>
            <IconButton
              onClick={handleWorkersReload}
              icon={IconName.RELOAD}
              label="Reload"
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
