import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

const SpacesTable: FC = ({ children }) => {
  const { spaces } = useAppSelector(({ bs }) => ({
    spaces: bs.spaces,
  }));

  const data = useMemo(() => getRows(spaces), [spaces]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table columns={columns} data={data} title="Spaces">
      {children}
    </Table>
  );
};

export { SpacesTable };
