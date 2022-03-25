import { FC } from 'react';
import ReactSelect from 'react-select';
import { useFormControl } from 'hooks/hooks';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  Option,
} from 'common/types/types';
import { ErrorMessage } from 'components/common/common';
import { styles as selectStyles } from './styles';
import styles from './styles.module.scss';

type Props = {
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  label: string;
  options: Option[];
  placeholder?: string;
};

const Select: FC<Props> = ({
  label,
  options,
  name,
  control,
  errors,
  placeholder,
}) => {
  const { field } = useFormControl({ name, control });

  const handleSelectChange = (newValue?: Option | null): void => {
    field.onChange(newValue?.value);
  };

  return (
    <div className={styles.reactSelectContainer}>
      <span>{label}</span>
      <ReactSelect
        {...field}
        placeholder={placeholder}
        styles={selectStyles}
        options={options}
        value={field.value.label}
        onChange={handleSelectChange}
      />
      <span className={styles.error}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Select };
