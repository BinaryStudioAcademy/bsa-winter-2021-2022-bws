import {
  ApiPath,
  MastersApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  MasterSignUpRequestDto,
  MasterSignInRequestDto,
  MasterDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public signUp(payload: MasterSignUpRequestDto): Promise<MasterDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.MASTERS, MastersApiPath.SIGN_UP),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
  public signIn(payload: MasterSignInRequestDto): Promise<MasterDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.MASTERS, MastersApiPath.SIGN_IN),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { AuthApi };
