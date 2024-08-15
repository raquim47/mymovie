import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import toastReducer from './toast';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
  useSelector;
