import { Middleware } from '@reduxjs/toolkit';
import { notification } from '../../../services/services';

const handleError: Middleware =
  () =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { name, message } = action.error;
      notification.error(name, message);
    }

    return next(action);
  };

export { handleError };
