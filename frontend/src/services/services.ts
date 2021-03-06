import { createBrowserHistory } from 'history';
import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { TenantApi } from './tenant-api/tenant-api.service';
import { EAMApi } from './eam-api/eam-api.service';
import { BSApi } from './bs-api/bs-api.service';
import { SCApi } from './sc-api/sc-api.service';
import { SLCApi } from './slc-api/slc-api.service';
import { Storage } from './storage/storage.service';
import { Notification } from './notification/notification.service';
import { Navigation } from './navigation/navigation.service';
import { Saver } from './saver/saver.service';

const storage = new Storage({
  storage: window.localStorage,
});

const http = new Http({ storage });

const notification = new Notification();

const saver = new Saver();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const tenantApi = new TenantApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const eamApi = new EAMApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const bsApi = new BSApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const scApi = new SCApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const slcApi = new SLCApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const navigation = new Navigation({
  history: createBrowserHistory(),
});

export {
  authApi,
  tenantApi,
  storage,
  navigation,
  notification,
  eamApi,
  bsApi,
  scApi,
  slcApi,
  saver,
};
