import { FC } from 'react';
import { Button, Modal } from 'components/common/common';
import { ButtonStyle, EntityType } from 'common/enums/enums';
import styles from './styles.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: EntityType;
}

const ConfirmDeletePopup: FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  entityType,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <p className={styles.title}>
          {`Are you sure you want to delete this ${entityType}?`}
        </p>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            btnStyle={ButtonStyle.FILLED}
            label="Confirm"
            onClick={onConfirm}
          />
          <Button
            btnStyle={ButtonStyle.OUTLINED}
            className={styles.button}
            label="Cancel"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export { ConfirmDeletePopup };
