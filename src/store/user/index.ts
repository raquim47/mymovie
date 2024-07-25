import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserState } from './types';

const initialState: IUserState = {
  userData: null,
  isInitialized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<IUser | null>) {
      state.userData = action.payload;
      state.isInitialized = true;
    },
  },
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;
