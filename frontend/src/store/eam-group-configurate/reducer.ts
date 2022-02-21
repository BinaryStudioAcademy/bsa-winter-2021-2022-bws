import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { create, getWorkers, getPermission } from './actions';
import {
  EAMWorkerGetAllItemResponseDto,
  EAMPermissionGetAllItemResponseDto,
} from 'common/types/types';
type State = {
  dataStatus: DataStatus;
  permissionsDateStatus: DataStatus;
  workers: EAMWorkerGetAllItemResponseDto[];
  permissions: EAMPermissionGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  permissionsDateStatus: DataStatus.IDLE,
  workers: [],
  permissions: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getWorkers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = action.payload.items;
  });
  builder.addCase(getPermission.fulfilled, (state, action) => {
    state.permissionsDateStatus = DataStatus.FULFILLED;
    state.permissions = action.payload.items;
  });
});

export { reducer };
