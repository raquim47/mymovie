import { configureStore } from '@reduxjs/toolkit';

// 스토어 설정
export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
