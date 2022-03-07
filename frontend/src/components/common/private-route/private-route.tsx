import { FC, ReactNode } from 'react';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import { Navigate } from 'components/common/common';
import { checkHasPermission } from 'helpers/helpers';

type Props = {
  redirectTo: AppRoute;
  component: ReactNode;
  permissions: string[];
};

const PrivateRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
  permissions,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  const hasPermission = checkHasPermission(
    permissions,
    user?.permissions ?? [],
  );

  if (!hasUser || !hasPermission) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { PrivateRoute };
