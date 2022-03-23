import { createReducer } from '@reduxjs/toolkit';
import {
  workerCreate,
  getGroups,
  saveCSV,
  cleanupCSV,
  getPermission,
} from './actions';
import { DataStatus } from 'common/enums/enums';
import {
  EAMGroupGetByTenantResponseItemDto,
  EAMPermissionGetAllItemResponseDto,
} from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  groups: EAMGroupGetByTenantResponseItemDto[];
  csvColumns: string[][];
  permissions: EAMPermissionGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groups: [],
  csvColumns: [],
  permissions: [],
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
  });

  builder.addCase(cleanupCSV, (state) => {
    state.csvColumns = [];
  });
  builder.addCase(getPermission.fulfilled, (state, action) => {
    state.permissions = action.payload.items;
  });
});

export { reducer };
