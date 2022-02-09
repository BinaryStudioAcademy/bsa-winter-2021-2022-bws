import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { signUp, loadCurrentUser } from './actions';
import { MasterDto } from '../../common/types/types';

type State = {
  dataStatus: DataStatus;
  user: MasterDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
});

export { reducer };
