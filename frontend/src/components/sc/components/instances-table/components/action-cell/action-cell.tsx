import styles from './styles.module.scss';
import deleteIcon from 'assets/img/delete-icon.svg';

const ActionCell = (
  id: string,
  onDeleteInstance: (id: string) => void,
): JSX.Element => {
  const handleDeleteInstance = (): void => {
    onDeleteInstance(id);
  };

  return (
    <button className={styles.button} onClick={handleDeleteInstance}>
      <img src={deleteIcon} alt="Delete" />
    </button>
  );
};

export { ActionCell };
