import { FC } from 'react';
import {
  Routes,
  Route,
  AuthorizedRoute,
  Toaster,
  Loader,
} from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { AppRoute, StorageKey } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Dashboard } from 'components/dashboard/dashboard';
import { storage } from 'services/services';

const App: FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const dispatch = useAppDispatch();
  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [dispatch]);

  if (!hasUser && hasToken) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route
          path={AppRoute.ROOT}
          element={<AuthorizedRoute component={<Dashboard />} />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export { App };
