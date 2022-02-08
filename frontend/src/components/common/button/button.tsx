import { ButtonType, ButtonColor } from 'common/enums/enums';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  color?: ButtonColor;
};

const Button: React.FC<Props> = ({
  type = ButtonType.BUTTON,
  label,
  color = ButtonColor.BLACK,
  onClick,
}) => (
  <button
    onClick={onClick}
    type={type}
    className={clsx(styles.btn, color && styles[`btn-${color}`])}
  >
    {label}
  </button>
);

export { Button };
