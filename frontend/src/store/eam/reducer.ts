import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { deleteGroup, loadWorkers, loadGroups } from './actions';
import { logOut } from 'store/auth/actions';
import {
  EAMGroupGetByTenantResponseItemDto,
  EAMWorkerGetAllItemResponseDto,
} from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  workers: EAMWorkerGetAllItemResponseDto[];
  groupsDataStatus: DataStatus;
  groups: EAMGroupGetByTenantResponseItemDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groupsDataStatus: DataStatus.IDLE,
  groups: [],
  workers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadWorkers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadWorkers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = action.payload.items;
  });
  builder.addCase(loadWorkers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadGroups.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
  });
  builder.addCase(loadGroups.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteGroup.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteGroup.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = state.groups.filter((group) => group.id !== action.payload);
  });
  builder.addCase(deleteGroup.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
