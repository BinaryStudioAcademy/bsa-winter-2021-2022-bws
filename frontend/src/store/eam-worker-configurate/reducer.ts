import { createReducer } from '@reduxjs/toolkit';
import { workerCreate, getGroups } from './actions';
import { DataStatus } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  groups: EAMGroupGetByTenantResponseItemDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groups: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(workerCreate.fulfilled, () => {
    return;
  });

  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
  });
});

export { reducer };
