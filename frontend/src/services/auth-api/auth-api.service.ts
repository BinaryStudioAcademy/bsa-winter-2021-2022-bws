import {
  ApiPath,
  MastersApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  EAMMasterSignUpResponseDto,
  EAMMasterSignInResponseDto,
  EAMMasterSignUpRequestDto,
  EAMMasterSignInRequestDto,
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

  public signUp(
    payload: EAMMasterSignUpRequestDto,
  ): Promise<EAMMasterSignUpResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.MASTERS, MastersApiPath.SIGN_UP),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public signIn(
    payload: EAMMasterSignInRequestDto,
  ): Promise<EAMMasterSignInResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.MASTERS, MastersApiPath.SIGN_IN),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getCurrentUser(): Promise<EAMMasterSignUpResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.MASTERS, MastersApiPath.USER),
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { AuthApi };
