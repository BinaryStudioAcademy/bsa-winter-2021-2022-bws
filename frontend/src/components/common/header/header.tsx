import logo from 'assets/img/logo.svg';
import profile from 'assets/img/profile.svg';
import menu from 'assets/img/menu.svg';
import { FC } from 'react';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import styles from './header.module.scss';
import { useState, useAppSelector } from 'hooks/hooks';

const Header: FC = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const { tenant } = useAppSelector(({ app }) => ({
    tenant: app.tenant,
  }));

  const handleVisibleChange = (): void => setVisible(!isVisible);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to={AppRoute.SIGN_IN}>
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.menu}>
          <div className={styles.profile}>
            <img src={profile} alt="profile" />
            <span className={styles.profileName}>{tenant?.name}</span>
          </div>
          <div className={styles.dropdownMenu} onClick={handleVisibleChange}>
            <img className={styles.dropdownMenuImg} src={menu} alt="menu" />
            {isVisible && (
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownItem}>Log Out</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export { Header };
