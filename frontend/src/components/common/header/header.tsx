import { FC } from 'react';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useState, useAppSelector, useAppDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import logo from 'assets/img/logo.svg';
import menu from 'assets/img/menu.svg';
import {
  EAMMasterByIdResponseDto,
  EAMWorkerByIdResponseDto,
} from 'common/types/types';
import styles from './styles.module.scss';

const Header: FC = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user, tenant } = useAppSelector(({ app, auth }) => ({
    user: auth.user,
    tenant: app.tenant,
  }));

  const handleVisibleChange = (): void => setVisible(!isVisible);
  const handleLogout = (): void => {
    dispatch(authActions.logOut());
  };

  const email = (user as EAMMasterByIdResponseDto)?.email;
  const name = (user as EAMWorkerByIdResponseDto)?.name;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to={AppRoute.ROOT}>
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.menu}>
          <div className={styles.profile}>
            <span className={styles.profileName}>
              {email ?? name ?? '-'} @ {tenant?.name ?? '-'}
            </span>
          </div>
          <button className={styles.dropdownMenu} onClick={handleVisibleChange}>
            <img className={styles.dropdownMenuImg} src={menu} alt="menu" />
            {isVisible && (
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownItem} onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
export { Header };
