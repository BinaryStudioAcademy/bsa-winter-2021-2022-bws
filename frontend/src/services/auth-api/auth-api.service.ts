import {
  ApiPath,
  AuthApiPath,
  MastersApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  EAMMasterSignUpResponseDto,
  EAMMasterSignInResponseDto,
  EAMMasterSignUpRequestDto,
  EAMMasterSignInRequestDto,
  EAMWorkerSignInRequestDto,
  EAMWorkerSignInResponseDto,
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

  public signInMaster(
    payload: EAMMasterSignInRequestDto,
  ): Promise<EAMMasterSignInResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.AUTH, AuthApiPath.MASTER),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public signInWorker(
    payload: EAMWorkerSignInRequestDto,
  ): Promise<EAMWorkerSignInResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.AUTH, AuthApiPath.WORKER),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getCurrentUser(): Promise<
    EAMMasterSignInResponseDto | EAMWorkerSignInResponseDto
  > {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.AUTH, MastersApiPath.ROOT),
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { AuthApi };
