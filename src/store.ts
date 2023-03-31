import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

export interface IRatingUsers {
  userId: string;
  nickName: string;
  userPhoto: string;
  rate: number;
  comment?: string;
  timestamp: number;
}
export interface IFavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  timestamp: number;
}
export interface IRatedMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  rate: number;
  comment?: string;
  timestamp: number;
}

export interface IUserAccount {
  email: string;
  nickName: string;
  userPhoto: string;
  favoriteMovies?: { [key: number]: IFavoriteMovie };
  ratedMovies?: { [key: number]: IRatedMovie };
}

export interface IUserMiniInfo {
  nickName: string;
  userPhoto: string;
  comment: string;
  rate: number;
}
// 로그인 확인, firebase init
const initSlice = createSlice({
  name: 'init',
  initialState: {
    initFirebase: false,
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setInitFirebase: (state) => {
      state.initFirebase = true;
    },
  },
});
// userData
const userDataSlice = createSlice({
  name: 'userData',
  initialState: null as IUserAccount | null,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserAccount>) => action.payload,
    clearUserData: (state) => null,
  },
});
// viewPort
const windowWidthSlice = createSlice({
  name: 'windowWidth',
  initialState: window.innerWidth,
  reducers: {
    setWidth: (state, action) => {
      return action.payload;
    },
  },
});

export const { setWidth } = windowWidthSlice.actions;
export const { setUserData, clearUserData } = userDataSlice.actions;
export const { setInitFirebase, setIsLoggedIn } = initSlice.actions;
export const userDataReducer = userDataSlice.reducer;
export const initReducer = initSlice.reducer;
export const windowWidthReducer = windowWidthSlice.reducer;

export const store = configureStore({
  reducer: {
    init: initReducer,
    userData: userDataReducer,
    windowWidth: windowWidthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
