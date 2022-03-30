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
  hasGroup: boolean;
};

const WorkersTable: FC<Props> = ({
  selectedWorkers,
  handleAddWorkerId,
  handleRemoveWorkerId,
  handleIsCheckedId,
  hasGroup,
}) => {
  const { workers } = useAppSelector(({ EAMGroupConfigurate }) => ({
    workers: EAMGroupConfigurate.workers,
  }));

  const data = useMemo(
    () =>
      getRows(
        workers,
        handleAddWorkerId,
        handleRemoveWorkerId,
        handleIsCheckedId,
      ),
    [workers, selectedWorkers],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <h3 className={styles.inputGroupTitle}>
        {hasGroup
          ? 'Edit workers in the group'
          : 'Add workers to the Group - Optional'}
      </h3>
      <Table
        className={styles.table}
        columns={columns}
        data={data}
        placeholder="No workers to display"
      />
    </div>
  );
};

export { WorkersTable };
