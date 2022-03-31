import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  useParams,
} from 'hooks/hooks';
import { Table, IconButton } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus, IconName } from 'common/enums/enums';
import { BSSpace as BSSpaceActions } from 'store/actions';
import styles from './styles.module.scss';
import { UsePaginationtemsHook } from 'common/types/app/use-pagination-hook.type';

type Props = {
  spaceId: string;
  onObjectDownload: (objectId: string) => void;
  onObjectDelete: (objectId: string) => void;
  pagination: UsePaginationtemsHook;
};

const ObjectsTable: FC<Props> = ({
  onObjectDelete,
  onObjectDownload,
  pagination,
}) => {
  const dispatch = useAppDispatch();

  const { objects, dataStatus } = useAppSelector(({ BSSpace }) => ({
    objects: BSSpace.objects,
    dataStatus: BSSpace.dataStatus,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

  const { id } = useParams();

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
    pagination.onReload();
  };

  const data = useMemo(
    () => getRows({ objects, onObjectDownload, onObjectDelete }),
    [objects],
  );

  const columns = useMemo(() => getColumns(), []);

  const handleObjectUpload = (evt: React.FormEvent<HTMLInputElement>): void => {
    const [file] = evt.currentTarget.files ?? [];
    const hasFiles = Boolean(file);

    if (!hasFiles) {
      return;
    }

    dispatch(
      BSSpaceActions.uploadObject({ id: id as string, file: file as File }),
    );

    (evt.target as HTMLInputElement).value = '';
  };

  return (
    <Table
      columns={columns}
      data={data}
      title="Objects"
      placeholder="No objects to display"
      isLoading={isLoading}
      pagination={pagination}
    >
      <div className={styles.buttonsBlock}>
        <IconButton
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
    </Table>
  );
};

export { ObjectsTable };
