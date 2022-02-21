import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

const GroupsTable: FC = ({ children }) => {
  const { groups } = useAppSelector(({ eam }) => ({
    groups: eam.groups,
  }));

  const data = useMemo(() => getRows(groups), [groups]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table columns={columns} data={data} title="Groups">
      {children}
    </Table>
  );
};

export { GroupsTable };
