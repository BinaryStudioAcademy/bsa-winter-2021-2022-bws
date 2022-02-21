import { FC } from 'react';
import {
  EAMMasterSignUpRequestDto,
  EAMMasterSignInRequestDto,
  EAMWorkerSignInRequestDto,
} from 'common/types/types';
import { auth as authActions } from 'store/actions';
import { AppRoute, UserRole } from 'common/enums/enums';
import {
  useLocation,
  useAppDispatch,
  useAppSelector,
  useState,
} from 'hooks/hooks';
import {
  SignInMasterForm,
  SignInWorkerForm,
  SignUpForm,
} from './components/components';
import styles from './styles.module.scss';
import logo from 'assets/img/logo.svg';
import { Navigate } from 'components/common/common';

const Auth: FC = () => {
  const [loginUserType, setLoginUserType] = useState<UserRole>(UserRole.WORKER);
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);
  if (hasUser) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleMasterSignInSubmit = (
    payload: EAMMasterSignInRequestDto,
  ): void => {
    dispatch(authActions.signInMaster(payload));
  };

  const handleWorkerSignInSubmit = (
    payload: EAMWorkerSignInRequestDto,
  ): void => {
    dispatch(authActions.signInWorker(payload));
  };

  const handleSignUpSubmit = (payload: EAMMasterSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const handleChangeForm = (userRole: UserRole): void =>
    setLoginUserType(userRole);

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        switch (loginUserType) {
          case UserRole.WORKER: {
            return (
              <SignInWorkerForm
                onSubmit={handleWorkerSignInSubmit}
                onChangeForm={handleChangeForm}
              />
            );
          }
          default: {
            return (
              <SignInMasterForm
                onSubmit={handleMasterSignInSubmit}
                onChangeForm={handleChangeForm}
              />
            );
          }
        }
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }
    return null;
  };

  return (
    <div className={styles.authConteiner}>
      <div className={styles.authWrapper}>
        <img className={styles.signUpLogo} src={logo} alt="logo" />
        {getScreen(pathname)}
      </div>
    </div>
  );
};

export { Auth };
