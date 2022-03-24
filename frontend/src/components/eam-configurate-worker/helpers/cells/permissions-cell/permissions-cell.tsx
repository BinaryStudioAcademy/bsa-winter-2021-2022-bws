import { Chip } from 'components/common/common';

const PermissionsCell = (permissions: string[]): JSX.Element => {
  return (
    <>
      {permissions.map((value, key) => {
        return <Chip key={key}>{value}</Chip>;
      })}
    </>
  );
};

export { PermissionsCell };
