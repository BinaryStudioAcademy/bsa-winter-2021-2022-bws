import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

type Props = {
  onGroupDelete: (id: string) => void;
};

const GroupsTable: FC<Props> = ({ children, onGroupDelete }) => {
  const { groups } = useAppSelector(({ eam }) => ({
    groups: eam.groups,
  }));

  const data = useMemo(() => getRows({ groups, onGroupDelete }), [groups]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Groups"
      placeholder="No groups to display"
      dataTestid="eam-group-table"
    >
      {children}
    </Table>
  );
};

export { GroupsTable };
