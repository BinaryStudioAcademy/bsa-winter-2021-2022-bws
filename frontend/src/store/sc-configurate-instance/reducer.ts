import { DataStatus } from 'common/enums/enums';
import {
  createInstance,
  loadOperationSystems,
  updateInstance,
} from './actions';
import { SCOperationSystemGetAllItemResponseDto } from 'common/types/types';
import { createReducer } from '@reduxjs/toolkit';

type State = {
  instanceDataStatus: DataStatus;
  operationSystemsDataStatus: DataStatus;
  operationSystems: SCOperationSystemGetAllItemResponseDto[];
};

const initialState: State = {
  instanceDataStatus: DataStatus.IDLE,
  operationSystemsDataStatus: DataStatus.IDLE,
  operationSystems: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOperationSystems.pending, (state) => {
    state.operationSystemsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadOperationSystems.fulfilled, (state, action) => {
    state.operationSystemsDataStatus = DataStatus.FULFILLED;
    state.operationSystems = action.payload.items;
  });
  builder.addCase(loadOperationSystems.rejected, (state) => {
    state.operationSystemsDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(createInstance.pending, (state) => {
    state.instanceDataStatus = DataStatus.PENDING;
  });
  builder.addCase(createInstance.fulfilled, (state) => {
    state.instanceDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(createInstance.rejected, (state) => {
    state.instanceDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateInstance.pending, (state) => {
    state.instanceDataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateInstance.fulfilled, (state) => {
    state.instanceDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(updateInstance.rejected, (state) => {
    state.instanceDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
