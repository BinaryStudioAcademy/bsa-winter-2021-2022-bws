import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { getWorkers, loadGroups } from './actions';
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
  builder.addCase(getWorkers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getWorkers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = action.payload.items;
  });
  builder.addCase(getWorkers.rejected, (state) => {
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
});

export { reducer };
