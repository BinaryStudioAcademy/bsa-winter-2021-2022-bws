import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  authApi,
  tenantApi,
  eamApi,
  bsApi,
  navigation,
  storage,
  workerApi,
  notification,
} from 'services/services';
import { handleError } from './middlewares/middlewares';

const extraArgument = {
  authApi,
  tenantApi,
  eamApi,
  bsApi,
  navigation,
  storage,
  workerApi,
  notification,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
      serializableCheck: false,
    }).concat(handleError);
  },
});

export { extraArgument, store };
