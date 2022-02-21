import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMMasterSignUpRequestDto,
  EAMMasterSignInRequestDto,
  EAMMasterByIdResponseDto,
  EAMWorkerSignInRequestDto,
  EAMWorkerByIdResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { StorageKey, AppRoute } from 'common/enums/enums';

const signUp = createAsyncThunk<
  EAMMasterByIdResponseDto,
  EAMMasterSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  storage.setItem(StorageKey.TOKEN, token);
  return user;
});

const signInMaster = createAsyncThunk<
  EAMMasterByIdResponseDto,
  EAMMasterSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN_MASTER, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signInMaster(registerPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

const signInWorker = createAsyncThunk<
  EAMWorkerByIdResponseDto,
  EAMWorkerSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN_WORKER, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signInWorker(registerPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

const loadCurrentUser = createAsyncThunk<
  EAMMasterByIdResponseDto | EAMWorkerByIdResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_CURRENT_USER, async (_payload, { extra }) => {
  const { authApi } = extra;
  const { user } = await authApi.getCurrentUser();

  return user;
});

const logOut = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.LOG_OUT,
  async (_payload, { extra }) => {
    const { storage, navigation } = extra;

    storage.removeItem(StorageKey.TOKEN);
    navigation.push(AppRoute.SIGN_IN);
  },
);

export { signUp, signInMaster, signInWorker, loadCurrentUser, logOut };
