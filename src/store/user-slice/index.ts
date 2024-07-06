import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

const initialState: {
  userData: User | null;
} = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<User | null>) {
      state.userData = action.payload;
    },
    logoutUser(state) {
      state.userData = null;
    },
  },
});

export const { setUserState, logoutUser } = userSlice.actions;
export default userSlice.reducer;
