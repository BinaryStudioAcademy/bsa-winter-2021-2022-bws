import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';
import {
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceGetByTenantResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadSshKey = createAsyncThunk<void, string, AsyncThunkConfig>(
  ActionType.GET_SSH_KEY,
  async (id, { extra }) => {
    const { scApi, notification } = extra;
    const { sshKey } = await scApi.loadSshKey(id);
    await navigator.clipboard.writeText(sshKey);
    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.SC_SSH_KEY_COPY,
    );
  },
);

const loadInstances = createAsyncThunk<
  SCInstanceGetByTenantResponseDto,
  SCInstanceGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_INSTANCES, async (params, { extra }) => {
  const { scApi } = extra;
  return scApi.loadInstances(params);
});

const deleteInstance = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE_INSTANCE,
  async (id, { extra }) => {
    const { scApi, notification } = extra;

    await scApi.deleteInstance(id);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.SC_INSTANCE_DELETE,
    );

    return id;
  },
);

export { loadInstances, deleteInstance, loadSshKey };
