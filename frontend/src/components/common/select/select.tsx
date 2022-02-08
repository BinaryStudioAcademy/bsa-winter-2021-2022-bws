import React from 'react';
import ReactSelect, { ActionMeta } from 'react-select';
import styles from './styles.module.scss';

type Props = {
  label: string;
  options: [];
  onChange: (newValue: null, actionMeta: ActionMeta<never>) => void;
};

const Select: React.FC<Props> = ({ label, options, onChange }) => {
  return (
    <div className={styles.reactSelectContainer}>
      <span>{label}</span>
      <ReactSelect
        onChange={onChange}
        classNamePrefix={'reactSelect'}
        options={options}
      />
    </div>
  );
};

export { Select };
