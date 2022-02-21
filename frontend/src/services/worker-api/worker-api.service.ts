import {
  ApiPath,
  ContentType,
  EAMApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class WorkerApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public createWorker(
    payload: EAMWorkerCreateRequestDto,
  ): Promise<EAMWorkerCreateResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.EAM, EAMApiPath.WORKERS),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { WorkerApi };
