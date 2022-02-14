import { reducer as app } from './app/reducer';
import { reducer as auth } from './auth/reducer';
import { reducer as eam } from './app/reducer';
import { reducer as toastr } from 'react-redux-toastr';

const rootReducer = {
  app,
  auth,
  eam,
  toastr,
};

export { rootReducer };
