import { FC } from 'react';
import styles from './loader.module.scss';

const Loader: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner}></div>
  </div>
);

export { Loader };
