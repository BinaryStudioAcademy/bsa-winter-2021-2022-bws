import { EntityType } from 'common/enums/enums';
import { ConfirmDeletePopup } from 'components/common/common';
import { useAppDispatch, useEffect, useParams, useState } from 'hooks/hooks';
import { ObjectsTable } from './components/components';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import { BSSpace as BSSpaceActions } from 'store/actions';

const BSSpace: FC = () => {
  const dispatch = useAppDispatch();
  const [currentObjectId, setCurrentObjectId] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(
      BSSpaceActions.loadObjects({
        filter: {
          from: 0,
          count: 5,
        },
        id: id as string,
      }),
    );
  }, [dispatch]);

  const handleObjectDownload = (objectId: string): void => {
    dispatch(
      BSSpaceActions.downloadObject({
        spaceId: id as string,
        objectId,
      }),
    );
  };

  const handleObjectDelete = (id: string): void => setCurrentObjectId(id);

  const handleCancelDelete = (): void => setCurrentObjectId(null);

  const handleConfirmDelete = (): void => {
    dispatch(
      BSSpaceActions.deleteObject({
        spaceId: id as string,
        objectId: currentObjectId as string,
      }),
    );
    setCurrentObjectId(null);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          BS - <br />
          Binary Storage
        </h2>
        <div className={styles.tableWrapper}>
          <ObjectsTable
            spaceId={id as string}
            onObjectDelete={handleObjectDelete}
            onObjectDownload={handleObjectDownload}
          />
        </div>
      </div>
      <ConfirmDeletePopup
        isOpen={Boolean(currentObjectId)}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        entityType={EntityType.OBJECT}
      />
    </>
  );
};

export { BSSpace };
