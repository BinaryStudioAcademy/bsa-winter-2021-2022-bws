import { FC } from 'react';
import { eamMasterSignIn as masterSignInValidationSchema } from 'validation-schemas/validation-schemas';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { useAppForm, useState } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { EAMMasterSignInRequestDto } from 'common/types/types';
import { Button, Input, Link, PasswordInput } from 'components/common/common';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';
import styles from './sign-in-form.module.scss';

type Props = {
  onSubmit: (payload: EAMMasterSignInRequestDto) => void;
};

const SignInForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMMasterSignInRequestDto>({
      defaultValues: DEFAULT_LOGIN_PAYLOAD,
      validationSchema: masterSignInValidationSchema,
    });

  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = (): void => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.subtitle}>
        <span>Need to create a new account? </span>
        <Link to={AppRoute.SIGN_UP}>Sign Up</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type={InputType.TEXT}
            label="Email"
            placeholder="Enter your email"
            name={getNameOf<EAMMasterSignInRequestDto>('email')}
            control={control}
            errors={errors}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<EAMMasterSignInRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <Button
          type={ButtonType.SUBMIT}
          label="Sign In"
          onClick={clickHandler}
          btnStyle={isClicked ? ButtonStyle.OUTLINED : ButtonStyle.FILLED}
        />
      </form>
    </>
  );
};

export { SignInForm };
