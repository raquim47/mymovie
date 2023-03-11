import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// detail
const isDetailOpen = createSlice({
  name: "isDetailOpen",
  initialState: false,
  reducers: {
    setisDetailOpen(state, action:PayloadAction<boolean>) {
      state = !state;
    },
  },
});
export const { setisDetailOpen } = isDetailOpen.actions;


export default configureStore({
  reducer: {
    isDetailOpen: isDetailOpen.reducer,
  },
});