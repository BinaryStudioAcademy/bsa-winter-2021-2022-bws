import { IconButton } from 'components/common/icon-button/icon-button';
import { IconName, AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionCell = ({
  id,
  keyId,
  onInstanceDelete,
  onKeyClick,
}: {
  id: string;
  keyId: string;
  onInstanceDelete: (id: string) => void;
  onKeyClick: (keyId: string) => void;
}): JSX.Element => {
  const handleCopyKey = (): void => {
    onKeyClick(keyId);
  };

  const handleDelete = (): void => {
    onInstanceDelete(id);
  };

  return (
    <div className={styles.wrapper}>
      <IconButton icon={IconName.KEY} label="Delete" onClick={handleCopyKey} />
      <IconButton
        icon={IconName.GEAR}
        label="Edit"
        to={
          `${AppRoute.SC_CONFIGURATE_INSTANCE}/${id}` as AppRoute.SC_CONFIGURATE_INSTANCE_$ID
        }
      />
      <IconButton icon={IconName.TRASH} label="Delete" onClick={handleDelete} />
    </div>
  );
};

export { ActionCell };
