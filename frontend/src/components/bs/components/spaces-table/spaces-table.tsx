import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

type Props = {
  onSpaceDelete: (id: string) => void;
};

const SpacesTable: FC<Props> = ({ children, onSpaceDelete }) => {
  const { spaces } = useAppSelector(({ bs }) => ({
    spaces: bs.spaces,
  }));

  const data = useMemo(() => getRows({ spaces, onSpaceDelete }), [spaces]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Spaces"
      placeholder="No spaces to display"
    >
      {children}
    </Table>
  );
};

export { SpacesTable };
