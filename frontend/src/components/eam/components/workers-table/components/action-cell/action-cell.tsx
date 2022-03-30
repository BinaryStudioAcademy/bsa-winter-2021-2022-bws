import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const ActionCell = (
  id: string,
  onWorkerDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onWorkerDelete(id);
  };
  return (
    <div className={styles.wrapper}>
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
