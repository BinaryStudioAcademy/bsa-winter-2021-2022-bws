import { FC } from 'react';
import { masterSignUp as masterSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { AppRoute, ButtonType, InputType } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { MasterSignUpRequestDto } from 'common/types/types';
import { Button, Input, Link, PasswordInput } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';
import styles from './sign-up-form.module.scss';

type Props = {
  onSubmit: (payload: MasterSignUpRequestDto) => void;
};

const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<MasterSignUpRequestDto>({
    defaultValues: DEFAULT_REGISTER_PAYLOAD,
    validationSchema: masterSignUpValidationSchema,
  });

  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.subtitle}>
        <span>Already have an account? </span>
        <Link to={AppRoute.SIGN_IN}>Sign In</Link>
      </div>
      <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signUpFormContent}>
          <Input
            type={InputType.TEXT}
            label="Email"
            placeholder="Enter your email"
            name={getNameOf<MasterSignUpRequestDto>('email')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Name"
            placeholder="Enter your name"
            name={getNameOf<MasterSignUpRequestDto>('name')}
            control={control}
            errors={errors}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<MasterSignUpRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <Button type={ButtonType.SUBMIT} label="Sign Up" />
      </form>
    </>
  );
};

export { SignUpForm };
