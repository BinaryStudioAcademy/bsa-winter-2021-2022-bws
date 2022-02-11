import { createBrowserHistory } from 'history';
import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { TenantApi } from './tenant-api/tenant-api.service';
import { Storage } from './storage/storage.service';
import { Notification } from './notification/notification.service';
import { Navigation } from './navigation/navigation.service';

const storage = new Storage({
  storage: window.localStorage,
});

const http = new Http({ storage });

const notification = new Notification();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const tenantApi = new TenantApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const navigation = new Navigation({
  history: createBrowserHistory(),
});

export { authApi, tenantApi, storage, navigation, notification };
