import { ContentType, HttpMethod } from 'common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class GroupApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public createWorker(
    payload: EAMGroupCreateRequestDto,
  ): Promise<EAMGroupCreateResponseDto> {
    return this.#http.load(joinItems(this.#apiPrefix, '/'), {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
}

export { GroupApi };
