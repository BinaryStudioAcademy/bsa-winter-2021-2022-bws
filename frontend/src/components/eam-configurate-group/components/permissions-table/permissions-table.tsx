import React, { FC } from 'react';
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
  const { permissions } = useAppSelector(({ EAMGroupConfigurate }) => ({
    permissions: EAMGroupConfigurate.permissions,
  }));

  const data = useMemo(() => getRows(permissions), [permissions]);

  const columns = useMemo(
    () =>
      getColumns(
        handleAddPermissionId,
        handleRemovePermissionId,
        handleIsCheckedPermissionId,
      ),
    [selectedPermissions],
  );
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.inputGroupTitle}>Attach permissions policies</h3>
      <Table className={styles.table} columns={columns} data={data} />
    </div>
  );
};

export { PermissionsTable };
