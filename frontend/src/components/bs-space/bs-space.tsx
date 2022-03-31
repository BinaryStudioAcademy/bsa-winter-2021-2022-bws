import { EntityType, Pagination } from 'common/enums/enums';
import { ConfirmDeletePopup } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
  useParams,
  useState,
} from 'hooks/hooks';
import { ObjectsTable } from './components/components';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import { BSSpace as BSSpaceActions } from 'store/actions';

const BSSpace: FC = () => {
  const dispatch = useAppDispatch();
  const [currentObjectId, setCurrentObjectId] = useState<string | null>(null);

  const { id } = useParams();

  const { objects, countItems } = useAppSelector(({ BSSpace }) => ({
    countItems: BSSpace.countItems,
    objects: BSSpace.objects,
  }));

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      BSSpaceActions.loadObjects({
        filter: {
          from,
          count,
        },
        id: id as string,
      }),
    );
  };

  const objectsPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  useEffect(() => {
    handleLoad(Pagination.INITIAL_FROM_COUNT, Pagination.PER_PAGE);
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

  const handleConfirmDelete = async (): Promise<void> => {
    await dispatch(
      BSSpaceActions.deleteObject({
        spaceId: id as string,
        objectId: currentObjectId as string,
      }),
    );
    setCurrentObjectId(null);

    if (objects.length) {
      return handleLoad(
        (objectsPagination.currentPage - 1) * Pagination.PER_PAGE,
        Pagination.PER_PAGE,
      );
    }

    return handleLoad(
      (objectsPagination.currentPage - 2) * Pagination.PER_PAGE,
      Pagination.PER_PAGE,
    );
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
            pagination={objectsPagination}
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
