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
import styles from './styles.module.scss';

type Props = {
  label: string;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  type?: InputType;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
  type = InputType.TEXT,
  rows,
  value,
  onChange,
}) => {
  const { field } = useFormControl({ name, control });
  const hasError = Boolean(errors[name]);
  const hasLabel = Boolean(label);
  const isTextarea = Boolean(rows);

  return (
    <label className={styles.inputLabel}>
      <span
        className={getValidClasses(styles.span, !hasLabel && 'visually-hidden')}
      >
        {label}
      </span>
      <span className={styles.inputWrapper}>
        {isTextarea ? (
          <textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            className={getValidClasses(
              styles.textarea,
              hasError ? styles.inputError : styles.input,
            )}
          />
        ) : (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={getValidClasses(
              hasError ? styles.inputError : styles.input,
            )}
            value={value}
            onChange={onChange}
          />
        )}
      </span>
      <span className={styles.error}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
