import { DataStatus } from 'common/enums/enums';
import { createReducer } from '@reduxjs/toolkit';
import { createSpace } from './actions';

type State = {
  dataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(createSpace.fulfilled, () => {
    return;
  });
});

export { reducer };
