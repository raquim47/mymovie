import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { login, signUp } from 'services/auth';
import { ICredentials } from 'services/auth/types';

const authAsyncThunk = (
  name: string,
  authFunction: (params: ICredentials) => Promise<User>
) => {
  return createAsyncThunk<User, ICredentials, { rejectValue: { message: string } }>(
    `auth/${name}`,
    async ({ email, password }, { rejectWithValue }) => {
      try {
        return await authFunction({ email, password });
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue({ message: error.message });
        } else {
          return rejectWithValue({ message: 'Unknown error occurred' });
        }
      }
    }
  );
};

export const loginUser = authAsyncThunk('loginUser', login);
export const signUpUser = authAsyncThunk('signUpUser', signUp);
