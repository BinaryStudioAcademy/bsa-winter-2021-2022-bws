import { SCInstanceGetByTenantResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import { deleteInstance, loadInstances } from './actions';
import { logOut } from 'store/auth/actions';

type State = {
  dataStatus: DataStatus;
  instances: SCInstanceGetByTenantResponseItemDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  instances: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadInstances.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadInstances.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.instances = action.payload.items;
  });
  builder.addCase(loadInstances.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteInstance.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteInstance.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.instances = state.instances.filter(
      (item) => item.id !== action.payload,
    );
  });
  builder.addCase(deleteInstance.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
