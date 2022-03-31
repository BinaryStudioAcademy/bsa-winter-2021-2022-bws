import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
  useParams,
} from 'hooks/hooks';
import { Table, IconButton } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus, Pagination, IconName } from 'common/enums/enums';
import { BSSpace as BSSpaceActions } from 'store/actions';
import styles from './styles.module.scss';

type Props = {
  spaceId: string;
  onObjectDownload: (objectId: string) => void;
  onObjectDelete: (objectId: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const ObjectsTable: FC<Props> = ({
  onObjectDelete,
  onObjectDownload,
  spaceId,
}) => {
  const dispatch = useAppDispatch();

  const { objects, dataStatus, countItems } = useAppSelector(({ BSSpace }) => ({
    objects: BSSpace.objects,
    dataStatus: BSSpace.dataStatus,
    countItems: BSSpace.countItems,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      BSSpaceActions.loadObjects({
        filter: {
          from,
          count,
        },
        id: spaceId,
      }),
    );
  };

  const objectsPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

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
    objectsPagination.onReload();
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
      pagination={objectsPagination}
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
