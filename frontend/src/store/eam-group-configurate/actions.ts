import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  EAMGroupConfigurateRequestDto,
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMPermissionGetAllResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute } from '../../common/enums/app/app-route.enum';

const create = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupConfigurateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (registerPayload, { getState, extra }) => {
  const { eamApi, navigation, notification } = extra;

  const { app } = getState();
  const { tenant } = app;

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId: tenant?.id ?? '',
    workersIds: registerPayload.workersIds,
    permissionsIds: registerPayload.permissionsIds,
  };

  const group = await eamApi.createGroup(request);

  navigation.push(AppRoute.EAM);
  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.EAM_GROUP_CREATE,
  );

  return group;
});

const loadWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (payload, { extra }) => {
  const { eamApi } = extra;
  return eamApi.getAllWorkers(payload);
});

const getPermission = createAsyncThunk<
  EAMPermissionGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_PERMISSIONS, async (_payload, { extra }) => {
  const { eamApi } = extra;
  return eamApi.getAllPermission();
});

export { create, loadWorkers, getPermission };
