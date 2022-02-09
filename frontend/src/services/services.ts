import { createBrowserHistory } from 'history';
import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { Storage } from './storage/storage.service';
import { Notification } from './notifications/notification.service';
import { Navigation } from './navigation/navigation.service';

const http = new Http();

const notification = new Notification();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});
const navigation = new Navigation({
  history: createBrowserHistory(),
});

const storage = new Storage({
  storage: window.localStorage,
});

export { authApi, storage, navigation, notification };
