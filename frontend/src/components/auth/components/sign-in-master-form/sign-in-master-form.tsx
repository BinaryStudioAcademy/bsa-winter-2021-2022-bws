import { FC } from 'react';
import { eamMasterSignIn as masterSignInValidationSchema } from 'validation-schemas/validation-schemas';
import { AppRoute, ButtonType, InputType, UserRole } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { EAMMasterSignInRequestDto } from 'common/types/types';
import { Button, Input, Link, PasswordInput } from 'components/common/common';
import { DEFAULT_MASTER_LOGIN_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: EAMMasterSignInRequestDto) => void;
  onChangeForm: (userRole: UserRole) => void;
};

const SignInMasterForm: FC<Props> = ({ onSubmit, onChangeForm }) => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMMasterSignInRequestDto>({
      defaultValues: DEFAULT_MASTER_LOGIN_PAYLOAD,
      validationSchema: masterSignInValidationSchema,
    });

  const handleOnChangeForm = (): void => {
    onChangeForm(UserRole.WORKER);
  };

  return (
    <>
      <h1 className={styles.title}>Sign In</h1>
      <div>
        <button className={styles.button} onClick={handleOnChangeForm}>
          Sign In as worker
        </button>
      </div>
      <div className={styles.subtitle}>
        <span>Need to create a new account? </span>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Sign Up
        </Link>
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
        <Button type={ButtonType.SUBMIT} label="Sign In" />
      </form>
    </>
  );
};

export { SignInMasterForm };
