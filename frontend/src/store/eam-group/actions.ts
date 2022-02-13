import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const eamGroup = createAsyncThunk<
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  AsyncThunkConfig
>(
  ActionType.EAM_CREATE_GROUP,
  async (payload: EAMGroupCreateRequestDto, { extra }) => {
    const { groupApi } = extra;
    const { group } = await groupApi.createGroup();
    return group;
    // createGroup;
  },
);

export { eamGroup };
