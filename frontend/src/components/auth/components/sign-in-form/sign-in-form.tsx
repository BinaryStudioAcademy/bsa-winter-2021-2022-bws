import { masterSignIn as masterSignInValidationSchema } from 'validation-schemas/validation-schemas';
import { ButtonType, InputType } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { MasterSignInRequestDto } from 'common/types/types';
import { Button, Input, PasswordInput } from 'components/common/common';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import styles from './sign-in-form.module.scss';

type Props = {
  onSubmit: (payload: MasterSignInRequestDto) => void;
};

const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<MasterSignInRequestDto>({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: masterSignInValidationSchema,
  });

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
            name={getNameOf<MasterSignInRequestDto>('email')}
            control={control}
            errors={errors}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<MasterSignInRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <Button type={ButtonType.SUBMIT} label="Sign in" />
      </form>
    </>
  );
};

export { SignInForm };
