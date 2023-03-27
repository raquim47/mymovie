import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from './services/movieApi';

export interface IUserData {
  email?: string;
  nickName: string;
  userPhoto: string;
  favoriteMovie: IMovie[];
  ratedMovie: IMovie[]
}

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

const userDataSlice = createSlice({
  name: 'userData',
  initialState: null as IUserData | null,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserData>) => action.payload,
    clearUserData: (state) => null,
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export const { setInitFirebase, setIsLoggedIn } = initSlice.actions;
export const userDataReducer = userDataSlice.reducer;
export const initReducer = initSlice.reducer;

export const store = configureStore({
  reducer: {
    init: initReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
