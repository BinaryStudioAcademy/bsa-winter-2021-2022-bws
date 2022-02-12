import { CSSObject } from '@emotion/react';
import { ControlProps, OptionProps, StylesConfig } from 'react-select';

const styles: StylesConfig = {
  option: (provided: CSSObject, state: OptionProps): CSSObject => {
    return {
      ...provided,
      backgroundColor: state.isSelected ? 'var(--color-orange)' : '',
      '&:hover': {
        backgroundColor: 'var(--color-orange)',
      },
    };
  },
  control: (provided: CSSObject, state: ControlProps): CSSObject => {
    return {
      ...provided,
      minHeight: '45px',
      background: 'var(--color-boltgun)',
      border:
        state.menuIsOpen || state.hasValue
          ? '2px solid var(--color-orange)'
          : '2px solid var(--color-gray)',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: 'null',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--color-orange)' : '',
      },
    };
  },
  menu: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      color: '#ffffff',
      background: 'var(--color-boltgun)',
      cursor: 'pointer',
      '&:hover': {
        color: 'white',
      },
    };
  },
  singleValue: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      color: '#ffffff',
    };
  },
};

export { styles };
