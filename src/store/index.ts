import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/layout';

// 스토어 설정
export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
