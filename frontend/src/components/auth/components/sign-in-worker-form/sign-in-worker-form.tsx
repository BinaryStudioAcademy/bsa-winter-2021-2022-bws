import { FC } from 'react';
import { ButtonType, InputType, UserRole } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { EAMWorkerSignInRequestDto } from 'common/types/types';
import { Button, Input, PasswordInput } from 'components/common/common';
import { DEFAULT_WORKER_LOGIN_PAYLOAD } from './common/constants';
import { eamWorkerSignIn as workerSignInValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: EAMWorkerSignInRequestDto) => void;
  onChangeForm: (userRole: UserRole) => void;
};

const SignInWorkerForm: FC<Props> = ({ onSubmit, onChangeForm }) => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMWorkerSignInRequestDto>({
      defaultValues: DEFAULT_WORKER_LOGIN_PAYLOAD,
      validationSchema: workerSignInValidationSchema,
    });

  const handleOnChangeForm = (): void => {
    onChangeForm(UserRole.MASTER);
  };

  return (
    <>
      <h1 className={styles.title}>Sign In as Worker</h1>
      <div>
        <button className={styles.button} onClick={handleOnChangeForm}>
          Sign In as master
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type={InputType.TEXT}
            label="Tenant name"
            placeholder="Enter your tenant name"
            name={getNameOf<EAMWorkerSignInRequestDto>('tenantName')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Worker name"
            placeholder="Enter your Worker name"
            name={getNameOf<EAMWorkerSignInRequestDto>('workerName')}
            control={control}
            errors={errors}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<EAMWorkerSignInRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <Button type={ButtonType.SUBMIT} label="Sign In" />
      </form>
    </>
  );
};

export { SignInWorkerForm };
