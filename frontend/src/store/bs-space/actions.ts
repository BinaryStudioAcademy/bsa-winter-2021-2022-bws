import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  BSObjectDownloadParamsDto,
  BSObjectGetRequestParamsDto,
  BSObjectGetResponseDto,
  BSObjectGetResponseItemDto,
  BSObjectDeleteParamsDto,
} from 'common/types/types';
import { ActionType } from './common';
import {
  FormDataCommonKey,
  NotificationMessage,
  NotificationTitle,
} from 'common/enums/enums';
import { store } from 'store/store';

const loadObjects = createAsyncThunk<
  BSObjectGetResponseDto,
  {
    id: string;
    filter: BSObjectGetRequestParamsDto;
  },
  AsyncThunkConfig
>(ActionType.GET_OBJECTS, async ({ filter, id }, { extra }) => {
  const { bsApi } = extra;

  return bsApi.loadObjects(filter, id);
});

const downloadObject = createAsyncThunk<
  BSObjectDownloadParamsDto,
  BSObjectDownloadParamsDto,
  AsyncThunkConfig
>(ActionType.DOWNLOAD_OBJECT, async (params, { extra }) => {
  const { bsApi, notification, saver } = extra;

  const { objects } = store.getState().BSSpace;

  const { name } = objects.find(
    ({ id }) => id === params.objectId,
  ) as BSObjectGetResponseItemDto;

  const response = await bsApi.downloadObject(params);

  saver.saveBlob(response, name);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_DOWNLOAD,
  );

  return params;
});

const uploadObject = createAsyncThunk<
  boolean,
  { id: string; file: File },
  AsyncThunkConfig
>(ActionType.UPLOAD_OBJECT, async (payload, { extra }) => {
  const { bsApi, notification } = extra;

  const formData = new FormData();
  formData.append(FormDataCommonKey.FILE, payload.file as File);

  const response = await bsApi.uploadObject(payload.id, formData);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_UPLOAD,
  );

  return response;
});

const deleteObject = createAsyncThunk<
  BSObjectDeleteParamsDto,
  BSObjectDeleteParamsDto,
  AsyncThunkConfig
>(ActionType.DELETE_OBJECT, async (params, { extra }) => {
  const { bsApi, notification } = extra;

  await bsApi.deleteObject(params);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_DELETE,
  );

  return params;
});

export { loadObjects, downloadObject, uploadObject, deleteObject };
