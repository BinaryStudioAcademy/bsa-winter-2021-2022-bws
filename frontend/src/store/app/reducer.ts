import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { getTenant } from './actions';
import { EAMTenantByIdResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  tenant: EAMTenantByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  tenant: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getTenant.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getTenant.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.tenant = action.payload;
  });
  builder.addCase(getTenant.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
