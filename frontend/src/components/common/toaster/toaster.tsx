import { FC } from 'react';
import ReduxToastr, {
  positionType,
  transitionInType,
  transitionOutType,
} from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

type Props = {
  timeOut?: number;
  isNewestOnTop?: boolean;
  isDuplicatesPrevented?: boolean;
  hasProgressBar?: boolean;
  isClosingOnClick?: boolean;
  position?: positionType;
  transitionIn?: transitionInType;
  transitionOut?: transitionOutType;
  className?: string;
};
const Toaster: FC<Props> = ({
  position = 'top-right',
  timeOut = 4000,
  isNewestOnTop,
  isDuplicatesPrevented,
  hasProgressBar,
  isClosingOnClick,
  transitionIn,
  transitionOut,
  className,
}) => (
  <ReduxToastr
    timeOut={timeOut}
    newestOnTop={isNewestOnTop}
    preventDuplicates={isDuplicatesPrevented}
    progressBar={hasProgressBar}
    closeOnToastrClick={isClosingOnClick}
    position={position}
    transitionIn={transitionIn}
    transitionOut={transitionOut}
    className={className}
  />
);

export { Toaster };
