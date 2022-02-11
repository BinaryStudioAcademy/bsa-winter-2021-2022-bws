import { FC } from 'react';
import { RouteProps } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import { Navigate } from 'react-router-dom';

type Props = RouteProps & {
  redirectTo?: AppRoute;
};

const PrivateRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  children,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
export { PrivateRoute };
