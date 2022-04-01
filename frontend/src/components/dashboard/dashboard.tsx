import { FC } from 'react';
import { ServicesList } from './components/components';
import { SERVICE_MENU_ITEMS } from './common/constants';
import styles from './styles.module.scss';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.loadCurrentUser());
  }, []);

  return (
    <div className={styles.wrapper}>
      <ServicesList services={SERVICE_MENU_ITEMS} />
    </div>
  );
};

export { Dashboard };
