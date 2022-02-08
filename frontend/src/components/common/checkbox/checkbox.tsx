import React from 'react';
import './styles.module.scss';

type Props = {
  label: string;
  isChecked: boolean;
  isDisabled?: boolean;
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: React.FC<Props> = ({
  label,
  isChecked = false,
  onChange,
  isDisabled = false,
}) => {
  return (
    <div className="container">
      <label>
        <input
          type="checkbox"
          onChange={onChange}
          disabled={isDisabled}
          checked={isChecked}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export { Checkbox };
