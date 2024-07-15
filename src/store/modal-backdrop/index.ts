import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  backdropPath: string | null;
} = {
  backdropPath: null,
};

const modalBackdropSlice = createSlice({
  name: 'modalBackdrop',
  initialState,
  reducers: {
    setModalBackdrop(state, action) {
      state.backdropPath = action.payload;
    },
  },
});

export const { setModalBackdrop } = modalBackdropSlice.actions;
export default modalBackdropSlice.reducer;
