import { createAsyncThunk } from '@reduxjs/toolkit';
import { initAuth, login, signUp } from 'services/auth';

export const authAsyncThunk = <T, P = void>(
  name: string,
  authFunction: (params: P) => Promise<T>
) => {
  return createAsyncThunk<T, P, { rejectValue: { message: string } }>(
    `auth/${name}`,
    async (params, { rejectWithValue }) => {
      try {
        return await authFunction(params);
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue({ message: error.message });
        } else {
          return rejectWithValue({ message: '알 수 없는 오류가 발생했습니다.' });
        }
      }
    }
  );
};



export const loginAction = authAsyncThunk('loginUser', login);
export const signUpAction = authAsyncThunk('signUpUser', signUp);
export const initAuthAction = authAsyncThunk('checkAuthState', initAuth);