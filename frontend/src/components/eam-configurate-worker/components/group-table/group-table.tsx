import React, { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  handleAddGroupId: (id: string) => void;
  handleRemoveGroupId: (id: string) => void;
  handleIsCheckedGroupId: (id: string) => boolean;
  selectedGroup: string[];
};

const GroupTable: FC<Props> = ({
  selectedGroup,
  handleAddGroupId,
  handleRemoveGroupId,
  handleIsCheckedGroupId,
}) => {
  const { groups } = useAppSelector(({ EAMWorkerConfigurate }) => ({
    groups: EAMWorkerConfigurate.groups,
  }));

  const data = useMemo(
    () =>
      getRows(
        groups,
        handleAddGroupId,
        handleRemoveGroupId,
        handleIsCheckedGroupId,
      ),
    [groups, selectedGroup],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <h3 className={styles.inputGroupTitle}>Add worker to group </h3>
      <Table
        className={styles.table}
        title="Groups"
        columns={columns}
        data={data}
        placeholder="No groups to display"
      />
    </div>
  );
};

export { GroupTable };
