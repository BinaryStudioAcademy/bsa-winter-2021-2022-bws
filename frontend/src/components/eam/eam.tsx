import { FC } from 'react';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import styles from './eam.module.scss';

const Eam: FC = () => {
  return (
    <div>
      <div className={styles.link}>
        <Link to={AppRoute.EAM_CREATE_WORKER}>Add User</Link>
      </div>
    </div>
  );
};

export { Eam };