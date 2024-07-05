import { createSlice } from '@reduxjs/toolkit';
import { signUpAction, loginAction, initAuthAction } from './thunk';
import { IAuthState } from './types';

const initialState: IAuthState = {
  user: null,
  error: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const actionMap = [loginAction, signUpAction, initAuthAction];

    actionMap.forEach(action => {
      builder.addCase(action.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      });
      builder.addCase(action.fulfilled, (state, actionData) => {
        state.status = 'succeeded';
        state.user = actionData.payload;
      });
      builder.addCase(action.rejected, (state, actionData) => {
        state.status = 'failed';
        state.error = actionData.payload?.message || '서버 처리 중 오류가 발생했습니다.';
      });
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
