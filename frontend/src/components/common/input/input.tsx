import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { InputType } from 'common/enums/enums';
import { ErrorMessage } from 'components/common/common';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  label: string;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  type?: InputType;
  placeholder?: string;
};

const Input: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
  type = InputType.TEXT,
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <label>
      <span>{label}</span>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={clsx(styles.input, errors[name] && styles['input-error'])}
      />
      <span className={styles.error}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
