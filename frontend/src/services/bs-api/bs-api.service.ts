import {
  ApiPath,
  BSApiPath,
  ContentType,
  HttpMethod,
  SpacesApiPath,
  ObjectsApiPath,
} from 'common/enums/enums';
import {
  BSObjectDeleteParamsDto,
  BSObjectDownloadParamsDto,
  BSObjectGetRequestParamsDto,
  BSObjectGetResponseDto,
  BSSpaceCreateRequestDto,
  BSSpaceCreateResponseDto,
  BSSpaceGetRequestParamsDto,
  BSSpaceGetResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class BSApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public loadSpaces(
    params: BSSpaceGetRequestParamsDto,
  ): Promise<BSSpaceGetResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.BS, BSApiPath.SPACES),
      {
        method: HttpMethod.GET,
        params,
      },
    );
  }

  public deleteSpace(id: string): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.BS,
        BSApiPath.SPACES,
        SpacesApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.DELETE,
      },
    );
  }

  public createSpace(
    payload: BSSpaceCreateRequestDto,
  ): Promise<BSSpaceCreateResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.BS, BSApiPath.SPACES),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public loadObjects(
    filter: BSObjectGetRequestParamsDto,
    id: string,
  ): Promise<BSObjectGetResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.BS,
        BSApiPath.SPACES,
        SpacesApiPath.ROOT,
        id,
        SpacesApiPath.OBJECTS,
      ),
      {
        method: HttpMethod.GET,
        params: filter,
      },
    );
  }

  public downloadObject(params: BSObjectDownloadParamsDto): Promise<Blob> {
    return this.#http.downloadBlob(
      joinItems(
        this.#apiPrefix,
        ApiPath.BS,
        BSApiPath.SPACES,
        SpacesApiPath.ROOT,
        params.spaceId,
        SpacesApiPath.OBJECTS,
        ObjectsApiPath.ROOT,
        params.objectId,
      ),
      {
        method: HttpMethod.GET,
      },
    );
  }

  public deleteObject(params: BSObjectDeleteParamsDto): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.BS,
        BSApiPath.SPACES,
        SpacesApiPath.ROOT,
        params.spaceId,
        SpacesApiPath.OBJECTS,
        ObjectsApiPath.ROOT,
        params.objectId,
      ),
      {
        method: HttpMethod.DELETE,
      },
    );
  }

  public uploadObject(id: string, file: FormData): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.BS,
        BSApiPath.SPACES,
        SpacesApiPath.ROOT,
        id,
        SpacesApiPath.OBJECTS,
      ),
      {
        method: HttpMethod.POST,
        payload: file,
      },
    );
  }
}

export { BSApi };
