import { reducer as toastr } from 'react-redux-toastr';
import { reducer as auth } from './auth/reducer';

const rootReducer = {
  auth,
  toastr,
};

export { rootReducer };
