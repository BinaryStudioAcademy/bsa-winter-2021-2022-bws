import { IconButton } from 'components/common/common';
import { AppRoute, IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  const url = `${AppRoute.SLC_CONFIGURATE_FUNCTION}/${id}`;

  const handleDelete = (): void => {
    onFunctionDelete(id);
  };
  return (
    <div className={styles.wrapper}>
      <IconButton
        title="Edit"
        icon={IconName.GEAR}
        label="Edit"
        to={url as AppRoute}
      />
      <IconButton
        title="Delete"
        icon={IconName.TRASH}
        label="Delete"
        onClick={handleDelete}
      />
    </div>
  );
};

export { ActionCell };
