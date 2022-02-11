import { FC } from 'react';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { InputType } from 'common/enums/enums';
import { ErrorMessage } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import styles from './input.module.scss';

type Props = {
  label: string;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  type?: InputType;
  placeholder?: string;
};

const Input: FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
  type = InputType.TEXT,
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <label className={styles.inputLabel}>
      <span className={styles.span}>{label}</span>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={getValidClasses(
          styles.input,
          errors[name] && styles.inputError,
        )}
      />
      <span className={styles.error}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
