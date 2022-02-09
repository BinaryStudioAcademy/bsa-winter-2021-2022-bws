import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  MasterSignUpRequestDto,
  MasterSignInDto,
  MasterDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const signIn = createAsyncThunk<
  Promise<MasterDto>,
  MasterSignInDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signIn(registerPayload);
});
const signUp = createAsyncThunk<
  MasterDto,
  MasterSignUpRequestDto,
  AsyncThunkConfig
>(
  ActionType.SIGN_UP,
  async (registerPayload: MasterSignUpRequestDto, { extra }) => {
    const { authApi } = extra;
    const user: MasterDto = await authApi.signUp(registerPayload);
    return user;
  },
);

export { signUp, signIn };
