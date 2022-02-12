import { FC, ReactNode } from 'react';
import { AppRoute } from 'common/enums/enums';
import { PrivateRoute, Header } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
};

const AuthorizedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <PrivateRoute redirectTo={redirectTo} component={component} />
      </main>
    </>
  );
};

export { AuthorizedRoute };
