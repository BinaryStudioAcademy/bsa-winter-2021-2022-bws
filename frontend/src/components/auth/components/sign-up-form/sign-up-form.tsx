import { masterSignUp as masterSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import logo from 'assets/img/logo.svg';
import {
  AppRoute,
  ButtonColor,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { MasterSignUpDto } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';
import styles from './sign-up-form.module.scss';

type Props = {
  onSubmit: (payload: MasterSignUpDto) => void;
};

const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<MasterSignUpDto>({
    defaultValues: DEFAULT_REGISTER_PAYLOAD,
    validationSchema: masterSignUpValidationSchema,
  });

  return (
    <>
      <div className={styles.signUpLogo}>
        <img src={logo} width="50" alt="logo" />
      </div>
      <h1 className={styles.signUpTitle}>Sign Up</h1>
      <div className={styles.signInLink}>
        <span>Already have an account? </span>
        <Link to={AppRoute.SIGN_IN}>Sign in</Link>
      </div>
      <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.signUpFormContent}>
          <Input
            type={InputType.TEXT}
            label="Email"
            placeholder="Enter your email"
            name={getNameOf<MasterSignUpDto>('email')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Name"
            placeholder="Enter your name"
            name={getNameOf<MasterSignUpDto>('name')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<MasterSignUpDto>('password')}
            control={control}
            errors={errors}
          />
        </p>
        <Button
          color={ButtonColor.ORANGE}
          type={ButtonType.SUBMIT}
          label={'Sing up'}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
      <div className={styles.signUpFormPolicy}>
        <span>By using bws you are agreeing to our </span>
        <Link to={AppRoute.ROOT}>privacy policy.</Link>
      </div>
    </>
  );
};

export { SignUpForm };
