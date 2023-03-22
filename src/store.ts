import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  nickName: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userData: { nickName: '' }
  },
  reducers: {
    setUser: (state, action:PayloadAction<IUser>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.userData = { nickName: '' };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;