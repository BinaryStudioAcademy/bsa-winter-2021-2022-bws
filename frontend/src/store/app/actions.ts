import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TenantRequestDto,
  TenantResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const getTenant = createAsyncThunk<
  TenantResponseDto,
  TenantRequestDto,
  AsyncThunkConfig
>(ActionType.GET_TENANT, async (registerPayload, { extra }) => {
  const { tenantApi } = extra;
  const tenant = await tenantApi.getTenant(registerPayload);
  return tenant;
});

export { getTenant };
