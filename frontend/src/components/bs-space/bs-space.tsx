import { IconName } from 'common/enums/enums';
import { IconButton } from 'components/common/common';
import { useAppDispatch, useEffect, useParams } from 'hooks/hooks';
import { ObjectsTable } from './components/components';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import { BSSpace as BSSpaceActions } from 'store/actions';

const BSSpace: FC = () => {
  const dispatch = useAppDispatch();

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

  const handleObjectsReload = (): void => {
    dispatch(
      BSSpaceActions.loadObjects({
        filter: {
          from: 0,
          count: 5,
        },
        id: id as string,
      }),
    );
  };

  const handleObjectDownload = (objectId: string): void => {
    dispatch(
      BSSpaceActions.downloadObject({
        spaceId: id as string,
        objectId,
      }),
    );
  };

  const handleObjectUpload = (evt: React.FormEvent<HTMLInputElement>): void => {
    const [file] = evt.currentTarget.files ?? [];
    const hasFiles = Boolean(file);

    if (!hasFiles) {
      return;
    }

    dispatch(
      BSSpaceActions.uploadObject({ id: id as string, file: file as File }),
    );
  };

  const handleObjectDelete = (objectId: string): void => {
    dispatch(
      BSSpaceActions.deleteObject({
        spaceId: id as string,
        objectId,
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
        <ObjectsTable
          spaceId={id as string}
          onObjectDelete={handleObjectDelete}
          onObjectDownload={handleObjectDownload}
        >
          <div className={styles.buttonsBlock}>
            <IconButton
              title="Refresh"
              onClick={handleObjectsReload}
              icon={IconName.RELOAD}
              label="Reload"
            />
            <label className={styles.fileInput}>
              Upload
              <input
                className={styles.hideDefaultInput}
                type="file"
                onChange={handleObjectUpload}
              />
            </label>
          </div>
        </ObjectsTable>
      </div>
    </div>
  );
};

export { BSSpace };
