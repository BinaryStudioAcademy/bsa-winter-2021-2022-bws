import { FC } from 'react';
import { Routes, Route, PrivateRoute, Toaster } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { AppRoute, StorageKey } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Dashboard } from 'components/dashboard/dashboard';
import { storage } from 'services/services';
import { Eam } from 'components/eam/eam';
import { EamCreateWorker } from 'components/eam-create-worker/eam-create-worker';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route
          path={AppRoute.ROOT}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.EAM} element={<Eam />} />
        <Route
          path={AppRoute.EAM_CREATE_WORKER}
          element={
            <PrivateRoute>
              <Dashboard />
              <EamCreateWorker />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export { App };
