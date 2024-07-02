import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  windowWidth: number;
  listRowSize: number;
}

const calculateListRowSize = (width: number) => {
  if (width < 600) return 2;
  else if (width < 900) return 3;
  else return 4;
};

const initialState: LayoutState = {
  windowWidth: window.innerWidth,
  listRowSize: calculateListRowSize(window.innerWidth),
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setWindowWidth: (state, action: PayloadAction<number>) => {
      state.windowWidth = action.payload;
      state.listRowSize = calculateListRowSize(action.payload);
    },
  },
});

export const { setWindowWidth } = layoutSlice.actions;
export default layoutSlice.reducer;
