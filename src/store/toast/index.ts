import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { IToastMessage, IToastState } from './types';

const initialState: IToastState = {
  messages: []
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: {
      reducer: (state, action: PayloadAction<IToastMessage>) => {
        state.messages.push(action.payload);
      },
      prepare: (description: string, duration: number = 3000) => ({
        payload: {
          id: nanoid(),
          description,
          createdAt: Date.now(),
          duration
        }
      })
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    }
  }
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
