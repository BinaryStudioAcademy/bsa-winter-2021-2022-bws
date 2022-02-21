import {
  ApiPath,
  ContentType,
  EAMApiPath,
  GroupsApiPath,
  WorkersApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMPermissionGetAllResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class EAMApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public loadGroups(
    params: EAMGroupGetByTenantRequestParamsDto,
  ): Promise<EAMGroupGetByTenantResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.GROUPS,
        GroupsApiPath.ROOT,
      ),
      {
        method: HttpMethod.GET,
        params,
      },
    );
  }

  public createGroup(
    payload: EAMGroupCreateRequestDto,
  ): Promise<EAMGroupCreateResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.EAM, EAMApiPath.GROUPS),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getAllWorkers(
    params: EAMWorkerGetByTenantRequestParamsDto,
  ): Promise<EAMWorkerGetAllResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.WORKERS,
        WorkersApiPath.ROOT,
      ),
      {
        method: HttpMethod.GET,
        params,
      },
    );
  }
  public getAllPermission(): Promise<EAMPermissionGetAllResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.EAM, EAMApiPath.PERMISSION),
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { EAMApi };
