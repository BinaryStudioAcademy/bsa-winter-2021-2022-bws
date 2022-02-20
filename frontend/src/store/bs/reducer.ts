import { BSSpaceGetResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import { loadSpaces } from './actions';

type State = {
  dataStatus: DataStatus;
  spaces: BSSpaceGetResponseItemDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  spaces: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadSpaces.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadSpaces.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.spaces = action.payload.items;
  });
  builder.addCase(loadSpaces.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
