import { FC } from 'react';
import styles from './styles.module.scss';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';

const NotFound: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Page Not Found</h1>
      <Link className={styles.link} to={AppRoute.ROOT}>
        Back to home
      </Link>
    </div>
  );
};

export { NotFound };
