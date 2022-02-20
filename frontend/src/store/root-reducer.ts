import { reducer as app } from './app/reducer';
import { reducer as auth } from './auth/reducer';
import { reducer as eam } from './eam/reducer';
import { reducer as bs } from './bs/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import { reducer as EAMGroupConfigurate } from './eam-group-configurate/reducer';
import { reducer as EAMWorkerConfigurate } from './eam-worker-configurate/reducer';
import { reducer as BSSpaceCreate } from './bs-space-create/reducer';

const rootReducer = {
  app,
  auth,
  eam,
  bs,
  BSSpaceCreate,
  toastr,
  EAMGroupConfigurate,
  EAMWorkerConfigurate,
};

export { rootReducer };
