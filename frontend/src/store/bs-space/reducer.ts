import { BSObjectGetResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import {
  deleteObject,
  downloadObject,
  loadObjects,
  uploadObject,
} from './actions';
import { logOut } from 'store/auth/actions';

type State = {
  dataStatus: DataStatus;
  objects: BSObjectGetResponseItemDto[];
  countItems: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  objects: [],
  countItems: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadObjects.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadObjects.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.objects = action.payload.items;
    state.countItems = action.payload.countItems;
  });
  builder.addCase(loadObjects.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(downloadObject.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(downloadObject.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(downloadObject.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(uploadObject.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(uploadObject.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(uploadObject.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteObject.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteObject.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.objects = state.objects.filter(
      (object) => object.id !== action.payload.objectId,
    );
  });
  builder.addCase(deleteObject.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
