import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NotificationTitle,
  NotificationMessage,
  AppRoute,
} from 'common/enums/enums';
import {
  SCOperationSystemGetAllResponseDto,
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadOperationSystems = createAsyncThunk<
  SCOperationSystemGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_OPERATION_SYSTEMS, async (payload, { extra }) => {
  const { scApi } = extra;

  return scApi.loadOperationSystems();
});

const createInstance = createAsyncThunk<
  SCInstanceCreateResponseDto,
  SCInstanceCreateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_INSTANCE, async (payload, { extra }) => {
  const { scApi, navigation, notification } = extra;

  navigation.push(AppRoute.SC);

  const instance = await scApi.createInstance(payload);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.SC_INSTANCE_CREATE,
  );

  return instance;
});

export { loadOperationSystems, createInstance };
