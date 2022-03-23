import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  handleAddPermissionId: (id: string) => void;
  handleRemovePermissionId: (id: string) => void;
  handleIsCheckedPermissionId: (id: string) => boolean;
  selectedPermissions: string[];
};

const PermissionsTable: FC<Props> = ({
  selectedPermissions,
  handleAddPermissionId,
  handleRemovePermissionId,
  handleIsCheckedPermissionId,
}) => {
  const { permissions } = useAppSelector(({ EAMWorkerConfigurate }) => ({
    permissions: EAMWorkerConfigurate.permissions,
  }));

  const data = useMemo(
    () =>
      getRows(
        permissions,
        handleAddPermissionId,
        handleRemovePermissionId,
        handleIsCheckedPermissionId,
      ),
    [permissions, selectedPermissions],
  );

  const columns = useMemo(() => getColumns(), []);
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.groupTitle}>Attach permissions policies</h3>
      <Table
        className={styles.table}
        columns={columns}
        data={data}
        placeholder="No permissions to display"
      />
    </div>
  );
};

export { PermissionsTable };
