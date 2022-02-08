import { ButtonType, ButtonColor } from 'common/enums/enums';
import { getValidClasses } from '../../../helpers/dom/get-valid-classes/get-valid-classes.helper';
import styles from './styles.module.scss';

type Props = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  btnStyle?: ButtonColor;
};

const Button: React.FC<Props> = ({
  type = ButtonType.BUTTON,
  label,
  btnStyle = ButtonColor.OUTLINED,
  onClick,
}) => (
  <button
    onClick={onClick}
    type={type}
    className={getValidClasses(styles.btn, btnStyle && styles[`${btnStyle}`])}
  >
    {label}
  </button>
);

export { Button };
