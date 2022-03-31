import { EntityType } from 'common/enums/enums';
import { ConfirmDeletePopup } from 'components/common/common';
import { useAppDispatch, useEffect, useState } from 'hooks/hooks';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { bs as bsActions } from 'store/actions';

const BS: FC = () => {
  const dispatch = useAppDispatch();
  const [currentSpaceId, setCurrentSpaceId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(
      bsActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleSpaceDelete = (id: string): void => setCurrentSpaceId(id);

  const handleCancelDelete = (): void => setCurrentSpaceId(null);

  const handleConfirmDelete = (): void => {
    dispatch(bsActions.deleteSpace(currentSpaceId as string));
    setCurrentSpaceId(null);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          BS - <br />
          Binary Storage
        </h2>
        <div className={styles.tableWrapper}>
          <SpacesTable onSpaceDelete={handleSpaceDelete} />
        </div>
      </div>
      <ConfirmDeletePopup
        isOpen={Boolean(currentSpaceId)}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        entityType={EntityType.SPACE}
      />
    </>
  );
};

export { BS };
