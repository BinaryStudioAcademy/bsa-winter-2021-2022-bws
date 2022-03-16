import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

type Props = {
  onFunctionDelete: (id: string) => void;
};

const FunctionsTable: FC<Props> = ({ children, onFunctionDelete }) => {
  const { functions } = useAppSelector(({ slc }) => ({
    functions: slc.functions,
  }));

  const data = useMemo(
    () => getRows({ slcFunctions: functions, onFunctionDelete }),
    [functions],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Functions"
      placeholder="No functions to display"
    >
      {children}
    </Table>
  );
};

export { FunctionsTable };
