import { FC } from 'react';
import {
  Routes,
  Route,
  AuthorizedRoute,
  Toaster,
  Loader,
} from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { auth as authActions, app as appActions } from 'store/actions';
import { AppRoute, DataStatus, StorageKey } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Dashboard } from 'components/dashboard/dashboard';
import { storage } from 'services/services';
import { EAM } from 'components/eam/eam';
import { EAMWorkerCreate } from 'components/eam-create-worker/eam-create-worker';
import { EAMConfigurateGroup } from 'components/eam-configurate-group/eam-configurate-group';
import { NotFound } from 'components/not-found-page/not-found-page';
import { BS } from 'components/bs/bs';
import { BSCreateSpace } from 'components/bs-create-space/bs-create-space';
import { SC } from 'components/sc/sc';
import { SCCreateInstance } from '../sc-create-instance/sc-create-instance';

const App: FC = () => {
  const { user, authStatus } = useAppSelector(({ auth }) => ({
    user: auth.user,
    authStatus: auth.dataStatus,
  }));
  const dispatch = useAppDispatch();
  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(appActions.getTenant({ id: user.tenantId }));
  }, [user, dispatch]);

  if (!hasUser && hasToken && authStatus !== DataStatus.REJECTED) {
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
        <Route
          path={AppRoute.EAM_CONFIGURATE_GROUP}
          element={<AuthorizedRoute component={<EAMConfigurateGroup />} />}
        />
        <Route
          path={AppRoute.EAM}
          element={<AuthorizedRoute component={<EAM />} />}
        />
        <Route
          path={AppRoute.EAM_CREATE_WORKER}
          element={<AuthorizedRoute component={<EAMWorkerCreate />} />}
        />
        <Route
          path={AppRoute.BS}
          element={<AuthorizedRoute component={<BS />} />}
        />
        <Route
          path={AppRoute.BS_CREATE_SPACE}
          element={<AuthorizedRoute component={<BSCreateSpace />} />}
        />
        <Route
          path={AppRoute.SC}
          element={<AuthorizedRoute component={<SC />} />}
        />
        <Route
          path={AppRoute.SC_CREATE_INSTANCE}
          element={<AuthorizedRoute component={<SCCreateInstance />} />}
        />
        <Route
          path={AppRoute.NOT_FOUND}
          element={<AuthorizedRoute component={<NotFound />} />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export { App };
