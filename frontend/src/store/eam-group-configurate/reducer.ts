import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  create,
  loadWorkers,
  getPermission,
  update,
  getGroupById,
} from './actions';
import {
  EAMWorkerGetAllItemResponseDto,
  EAMPermissionGetAllItemResponseDto,
  EamGroupGetByIdResponseDto,
} from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  permissionsDateStatus: DataStatus;
  workers: EAMWorkerGetAllItemResponseDto[];
  permissions: EAMPermissionGetAllItemResponseDto[];
  group: EamGroupGetByIdResponseDto | null;
  workersCountItems: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  permissionsDateStatus: DataStatus.IDLE,
  workers: [],
  permissions: [],
  group: null,
  workersCountItems: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(update.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(loadWorkers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = action.payload.items;
    state.workersCountItems = action.payload.countItems;
  });
  builder.addCase(loadWorkers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.workers = [];
  });
  builder.addCase(getPermission.fulfilled, (state, action) => {
    state.permissionsDateStatus = DataStatus.FULFILLED;
    state.permissions = action.payload.items;
  });
  builder.addCase(getPermission.pending, (state) => {
    state.permissionsDateStatus = DataStatus.PENDING;
    state.permissions = [];
  });
  builder.addCase(getGroupById.fulfilled, (state, action) => {
    state.group = action.payload;
  });
});

export { reducer };
