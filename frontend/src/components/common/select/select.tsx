import React from 'react';
import styles from './styles.module.scss';
import ReactSelect, { ActionMeta } from 'react-select';

type Props = {
  label: string;
  options: [];
  onChange: (newValue: null, actionMeta: ActionMeta<never>) => void;
};

const Select: React.FC<Props> = ({ label, options, onChange }) => {
  return (
    <div className={styles['react-select__container']}>
      <span>{label}</span>
      <ReactSelect
        onChange={onChange}
        // styles={{
        //   control: (provided) => ({
        //     ...provided,
        //     background: '#393939',
        //     borderRadius: '50px',
        //     border: '2px solid #8F8F8F',
        //     height: '45px',
        //     cursor: 'pointer' }),
        //   menu: (provided) => ({
        //     ...provided,
        //     background: '#393939',
        //     cursor: 'pointer' }),
        //   singleValue: (provided) => ({ ...provided, color: '#fff' }),
        // }}
        classNamePrefix={'react-select'}
        options={options}
      />
    </div>
  );
};

export { Select };
