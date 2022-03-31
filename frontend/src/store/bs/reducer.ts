import { BSSpaceGetResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import { deleteSpace, loadSpaces } from './actions';
import { Pagination } from 'common/enums/enums';
import { logOut } from 'store/auth/actions';

type State = {
  dataStatus: DataStatus;
  spaces: BSSpaceGetResponseItemDto[];
  countItems: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  spaces: [],
  countItems: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadSpaces.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.spaces = [];
  });
  builder.addCase(loadSpaces.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.spaces = action.payload.items;
    state.countItems = action.payload.countItems;
  });
  builder.addCase(loadSpaces.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteSpace.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteSpace.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.spaces = state.spaces.filter((space) => space.id !== action.payload);
    state.countItems = state.countItems - Pagination.INCREMENT;
  });
  builder.addCase(deleteSpace.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
