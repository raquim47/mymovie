import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserState } from './types';

const initialState: IUserState = {
  userData: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<IUser | null>) {
      state.userData = action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;
