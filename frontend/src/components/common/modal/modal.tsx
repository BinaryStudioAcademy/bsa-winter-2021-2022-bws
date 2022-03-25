import { KeydownKey } from 'common/enums/enums';
import { useEffect } from 'hooks/hooks';
import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    isOpen && (document.documentElement.style.overflowY = 'hidden');
    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.documentElement.style.overflowY = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleKeyDown = ({ key }: KeyboardEvent): void => {
    const isEscapeKey = key === KeydownKey.ESCAPE;

    if (isEscapeKey) {
      onClose();
    }
  };

  const handleOverlayCheck = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLElement>): void => {
    const isOverlay = target === currentTarget;

    if (isOverlay) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal} onClick={handleOverlayCheck}>
          {children}
        </div>
      )}
    </>
  );
};

export { Modal };
