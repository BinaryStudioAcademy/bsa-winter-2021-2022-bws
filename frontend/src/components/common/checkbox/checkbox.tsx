import { FC } from 'react';
import styles from './checkbox.module.scss';

type Props = {
  label: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: FC<Props> = ({
  label,
  onChange,
  isChecked = false,
  isDisabled = false,
}) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        type="checkbox"
        onChange={onChange}
        disabled={isDisabled}
        checked={isChecked}
      />
      <span className={styles.span}>{label}</span>
    </label>
  );
};

export { Checkbox };
