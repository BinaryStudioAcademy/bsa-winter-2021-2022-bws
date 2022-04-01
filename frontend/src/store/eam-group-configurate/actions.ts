import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NotificationTitle,
  NotificationMessage,
  Permission,
  AppRoute,
} from 'common/enums/enums';
import {
  AsyncThunkConfig,
  EAMGroupConfigurateRequestDto,
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMPermissionGetAllResponseDto,
  EamGroupGetByIdRequestDto,
  EamGroupGetByIdResponseDto,
  EAMGroupUpdateRequestDto,
} from 'common/types/types';
import { ActionType } from './common';
import { checkHasPermission } from 'helpers/helpers';

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

const update = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupUpdateRequestDto,
  AsyncThunkConfig
>(ActionType.UPDATE, async (payload, { getState, extra }) => {
  const { eamApi, navigation, notification, authApi } = extra;

  const { app } = getState();
  const { tenant } = app;

  const request: EAMGroupCreateRequestDto = {
    name: payload.name,
    tenantId: tenant?.id ?? '',
    workersIds: payload.workersIds,
    permissionsIds: payload.permissionsIds,
  };

  const group = await eamApi.updateGroup(payload.id, request);
  const { user } = await authApi.getCurrentUser();

  const hasEamPermission = checkHasPermission(
    [Permission.MANAGE_EAM],
    user.permissions,
  );
  if (hasEamPermission) {
    navigation.push(AppRoute.EAM);
    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.EAM_GROUP_UPDATE,
    );
  } else {
    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.EAM_GROUP_UPDATE,
    );
    navigation.push(AppRoute.ROOT);
  }

  return group;
});

const getGroupById = createAsyncThunk<
  EamGroupGetByIdResponseDto,
  EamGroupGetByIdRequestDto,
  AsyncThunkConfig
>(ActionType.GET_GROUP, async (payload, { extra }) => {
  const { eamApi } = extra;
  const group = await eamApi.getGroupById(payload);
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

export { create, update, loadWorkers, getPermission, getGroupById };
