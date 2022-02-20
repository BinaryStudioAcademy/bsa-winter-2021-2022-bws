import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BSSpaceGetRequestParamsDto,
  BSSpaceGetResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadSpaces = createAsyncThunk<
  BSSpaceGetResponseDto,
  BSSpaceGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_SPACES, async (filter, { extra }) => {
  const { bsApi } = extra;

  return bsApi.loadSpaces(filter);
});

export { loadSpaces };
