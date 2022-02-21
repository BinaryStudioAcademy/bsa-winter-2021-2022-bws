import React, { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  handleAddWorkerId: (id: string) => void;
  handleRemoveWorkerId: (id: string) => void;
  handleIsCheckedId: (id: string) => boolean;
  selectedWorkers: string[];
};

const WorkersTable: FC<Props> = ({
  selectedWorkers,
  handleAddWorkerId,
  handleRemoveWorkerId,
  handleIsCheckedId,
}) => {
  const { workers } = useAppSelector(({ EAMGroupConfigurate }) => ({
    workers: EAMGroupConfigurate.workers,
  }));

  const data = useMemo(() => getRows(workers), [workers]);

  const columns = useMemo(
    () =>
      getColumns(handleAddWorkerId, handleRemoveWorkerId, handleIsCheckedId),
    [selectedWorkers],
  );
  return (
    <div>
      <h3 className={styles.inputGroupTitle}>
        Add workers to the Group - Optional
      </h3>
      <Table className={styles.table} columns={columns} data={data} />
    </div>
  );
};

export { WorkersTable };
