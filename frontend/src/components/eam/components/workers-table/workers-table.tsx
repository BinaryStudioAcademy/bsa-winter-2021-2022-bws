import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';

const WorkersTable: FC = ({ children }) => {
  const { workers } = useAppSelector(({ eam }) => ({
    workers: eam.workers,
  }));

  const data = useMemo(() => getRows(workers), [workers]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table columns={columns} data={data} title="Workers">
      {children}
    </Table>
  );
};

export { WorkersTable };
