import {
  ApiPath,
  ContentType,
  EAMApiPath,
  GroupsApiPath,
  HttpMethod,
  WorkersApiPath,
} from 'common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  EAMPermissionGetAllResponseDto,
  EamGroupGetByIdResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
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

  public updateGroup(
    id: string,
    payload: EAMGroupCreateRequestDto,
  ): Promise<EAMGroupCreateResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.GROUPS,
        GroupsApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getGroupById(params: {
    id: string;
  }): Promise<EamGroupGetByIdResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.GROUPS,
        GroupsApiPath.ROOT,
        params.id,
      ),
      {
        method: HttpMethod.GET,
      },
    );
  }

  public deleteGroup(id: string): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.GROUPS,
        GroupsApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.DELETE,
      },
    );
  }

  public deleteWorker(id: string): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.WORKERS,
        WorkersApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.DELETE,
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

export { EAMApi };
