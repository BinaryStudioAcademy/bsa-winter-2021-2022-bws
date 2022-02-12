import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMMasterSignUpRequestDto,
  EAMMasterSignInRequestDto,
  EAMMasterByIdResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { StorageKey } from 'common/enums/enums';

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

const signIn = createAsyncThunk<
  EAMMasterByIdResponseDto,
  EAMMasterSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(registerPayload);
  storage.setItem(StorageKey.TOKEN, token);
  return user;
});

const loadCurrentUser = createAsyncThunk<
  EAMMasterByIdResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_CURRENT_USER, async (payload, { extra }) => {
  const { authApi } = extra;
  const { user } = await authApi.getCurrentUser();
  return user;
});

export { signUp, signIn, loadCurrentUser };
