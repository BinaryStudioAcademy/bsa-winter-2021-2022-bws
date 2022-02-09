import { toastr } from 'react-redux-toastr';
import styles from './notification.module.scss';

class Notification {
  public error = (title: string, message: string): void => {
    toastr.error(title, message, {
      className: styles.wrapper,
      icon: <div className={styles.attention} />,
    });
  };
}

export { Notification };
