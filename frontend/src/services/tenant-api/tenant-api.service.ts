import { ApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import {
  EAMTenantByIdRequestParamsDto,
  EAMTenantByIdResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class TenantApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getTenant(
    params: EAMTenantByIdRequestParamsDto,
  ): Promise<EAMTenantByIdResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.TENANTS, '/', params.id),
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { TenantApi };
