import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
} from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus, Pagination } from 'common/enums/enums';
import { BSSpace as BSSpaceActions } from 'store/actions';

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
  children,
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

  const data = useMemo(
    () => getRows({ objects, onObjectDownload, onObjectDelete }),
    [objects],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Objects"
      placeholder="No objects to display"
      isLoading={isLoading}
      pagination={objectsPagination}
    >
      {children}
    </Table>
  );
};

export { ObjectsTable };
