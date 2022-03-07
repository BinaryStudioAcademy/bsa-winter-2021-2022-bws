import { FC, ReactNode } from 'react';
import { AppRoute } from 'common/enums/enums';
import { PrivateRoute, Header } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
  permissions?: string[];
};

const AuthorizedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
  permissions = [],
}) => {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <PrivateRoute
          redirectTo={redirectTo}
          component={component}
          permissions={permissions}
        />
      </main>
    </>
  );
};

export { AuthorizedRoute };
