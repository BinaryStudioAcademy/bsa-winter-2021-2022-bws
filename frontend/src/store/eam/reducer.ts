import { createReducer } from '@reduxjs/toolkit';
import { DataStatus, Pagination } from 'common/enums/enums';
import { deleteGroup, loadWorkers, loadGroups, deleteWorker } from './actions';
import { logOut } from 'store/auth/actions';
import {
  EAMGroupGetByTenantResponseItemDto,
  EAMWorkerGetAllItemResponseDto,
} from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  workers: EAMWorkerGetAllItemResponseDto[];
  groupsDataStatus: DataStatus;
  workersDataStatus: DataStatus;
  groups: EAMGroupGetByTenantResponseItemDto[];
  workersCountAll: number;
  groupsCountAll: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groupsDataStatus: DataStatus.IDLE,
  workersDataStatus: DataStatus.IDLE,
  groups: [],
  workers: [],
  workersCountAll: 0,
  groupsCountAll: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadWorkers.pending, (state) => {
    state.workersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadWorkers.fulfilled, (state, action) => {
    state.workersDataStatus = DataStatus.FULFILLED;
    state.workers = action.payload.items;
    state.workersCountAll = action.payload.countItems;
  });
  builder.addCase(loadWorkers.rejected, (state) => {
    state.workersDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadGroups.pending, (state) => {
    state.groupsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadGroups.fulfilled, (state, action) => {
    state.groupsDataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
    state.groupsCountAll = action.payload.countItems;
  });
  builder.addCase(loadGroups.rejected, (state) => {
    state.groupsDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteGroup.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteGroup.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = state.groups.filter((group) => group.id !== action.payload);
    state.groupsCountAll = state.groupsCountAll - Pagination.INCREMENT;
  });
  builder.addCase(deleteGroup.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteWorker.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteWorker.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = state.workers.filter(
      (worker) => worker.id !== action.payload,
    );
  });
  builder.addCase(deleteWorker.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
