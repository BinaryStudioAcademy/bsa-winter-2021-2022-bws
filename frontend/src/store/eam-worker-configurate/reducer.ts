import { createReducer } from '@reduxjs/toolkit';
import { workerCreate, getGroups, saveCSV, cleanupCSV } from './actions';
import { DataStatus } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  groups: EAMGroupGetByTenantResponseItemDto[];
  csvColumns: string[][];
  countItems: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groups: [],
  csvColumns: [],
  countItems: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(workerCreate.fulfilled, (state, action) => {
    state.csvColumns = action.payload;
  });

  builder.addCase(saveCSV.fulfilled, () => {
    return;
  });

  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
    state.countItems = action.payload.countItems;
  });

  builder.addCase(cleanupCSV, (state) => {
    state.csvColumns = [];
  });
});

export { reducer };
