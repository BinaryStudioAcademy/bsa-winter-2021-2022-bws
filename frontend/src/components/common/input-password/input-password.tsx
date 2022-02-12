import { useState, FC } from 'react';
import { Input } from 'components/common/common';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { InputType, ButtonType } from 'common/enums/enums';
import styles from './input-password.module.scss';

type Props = {
  label: string;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  placeholder?: string;
};

const PasswordInput: FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowToggle = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className={styles.wrapper}>
      <Input
        type={isShowPassword ? InputType.TEXT : InputType.PASSWORD}
        label={label}
        placeholder={placeholder}
        name={name}
        control={control}
        errors={errors}
      />
      <button
        onClick={handleShowToggle}
        className={styles.eyeIcon}
        type={ButtonType.BUTTON}
      >
        <span className="visually-hidden">Toggle password visibility</span>
      </button>
    </div>
  );
};

export { PasswordInput };
