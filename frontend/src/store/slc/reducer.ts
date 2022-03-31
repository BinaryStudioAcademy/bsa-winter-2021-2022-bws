import { SLCFunctionGetResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import { loadFunctions, deleteFunction } from './actions';
import { Pagination } from 'common/enums/enums';
import { logOut } from 'store/auth/actions';

type State = {
  dataStatus: DataStatus;
  functions: SLCFunctionGetResponseItemDto[];
  countItems: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  functions: [],
  countItems: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadFunctions.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadFunctions.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.functions = action.payload.items;
    state.countItems = action.payload.countItems;
  });
  builder.addCase(loadFunctions.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteFunction.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteFunction.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.functions = state.functions.filter(
      (slcFunction) => slcFunction.id !== action.payload,
    );
    state.countItems = state.countItems - Pagination.INCREMENT;
  });
  builder.addCase(deleteFunction.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
