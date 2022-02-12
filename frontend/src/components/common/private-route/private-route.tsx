import { FC, ReactNode } from 'react';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import { Navigate } from 'components/common/common';

type Props = {
  redirectTo: AppRoute;
  component: ReactNode;
};

const PrivateRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { PrivateRoute };
