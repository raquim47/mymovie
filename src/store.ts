import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  nickName: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    init:false,
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
    setInit: (state) => {
      state.init = true;
    },
  },
});

export const { setUser, clearUser, setInit } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;