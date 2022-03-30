import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  EAMTenantByIdResponseDto,
  EAMTenantUpdateRequestDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
} from 'common/types/types';
import { ActionType } from './common';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';

const loadWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (payload, { extra }) => {
  const { eamApi } = extra;
  return eamApi.getAllWorkers(payload);
});

const loadGroups = createAsyncThunk<
  EAMGroupGetByTenantResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.LOAD_GROUPS, async (filter, { extra }) => {
  const { eamApi } = extra;
  return eamApi.loadGroups(filter);
});

const updateTenant = createAsyncThunk<
  EAMTenantByIdResponseDto,
  EAMTenantUpdateRequestDto,
  AsyncThunkConfig
>(ActionType.UPDATE_TENANT_NAME, async (payload, { extra }) => {
  const { tenantApi, notification } = extra;
  const tenant = await tenantApi.updateTenant(payload);
  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.EAM_UPDATE_TENANT_NAME,
  );
  return tenant;
});

const deleteGroup = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE_GROUP,
  async (id, { extra }) => {
    const { eamApi, notification } = extra;

    await eamApi.deleteGroup(id);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.EAM_GROUP_DELETE,
    );

    return id;
  },
);

const deleteWorker = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE_WORKER,
  async (id, { extra }) => {
    const { eamApi, notification } = extra;

    await eamApi.deleteWorker(id);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.EAM_WORKER_DELETE,
    );

    return id;
  },
);

export { loadWorkers, loadGroups, updateTenant, deleteGroup, deleteWorker };
