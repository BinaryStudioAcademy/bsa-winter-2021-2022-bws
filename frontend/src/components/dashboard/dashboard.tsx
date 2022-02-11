import { FC } from 'react';
import { Header } from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { app as appActions } from 'store/actions';
import { DataStatus } from 'common/enums/enums';

const Dashboard: FC = () => {
  const { user, tenantStatus } = useAppSelector(({ app, auth }) => ({
    user: auth.user,
    tenantStatus: app.dataStatus,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(appActions.getTenant({ id: user.tenantId }));
  }, [user, dispatch]);

  return (
    <div>
      {tenantStatus === DataStatus.FULFILLED ? (
        <Header />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export { Dashboard };
