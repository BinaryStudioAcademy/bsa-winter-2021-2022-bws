import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NotificationTitle,
  NotificationMessage,
  AppRoute,
} from 'common/enums/enums';
import {
  AsyncThunkConfig,
  BSSpaceCreateRequestDto,
  BSSpaceCreateResponseDto,
} from 'common/types/types';
import { ActionType } from './common';

const createSpace = createAsyncThunk<
  BSSpaceCreateResponseDto,
  BSSpaceCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_SPACE,
  async (payload: BSSpaceCreateRequestDto, { extra }) => {
    const { bsApi, navigation, notification } = extra;

    const space = await bsApi.createSpace(payload);

    navigation.push(AppRoute.BS);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.BS_SPACE_CREATE,
    );

    return space;
  },
);

export { createSpace };
