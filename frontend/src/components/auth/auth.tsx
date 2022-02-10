import { FC } from 'react';
import {
  MasterSignUpRequestDto,
  MasterSignInRequestDto,
} from 'common/types/types';
import { auth as authActions } from 'store/actions';
import { AppRoute } from 'common/enums/enums';
import { useLocation, useAppDispatch } from 'hooks/hooks';
import { SignInForm, SignUpForm } from './components/components';
import styles from './auth.module.scss';
import logo from 'assets/img/logo.svg';

const Auth: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleSignInSubmit = (payload: MasterSignInRequestDto): void => {
    dispatch(authActions.signIn(payload));
  };

  const handleSignUpSubmit = (payload: MasterSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
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
