import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from './user';
import authFormReducer from './auth-form';
import modalBackdropReducer from './modal-backdrop';
import toastReducer from './toast';

export const store = configureStore({
  reducer: {
    user: userReducer,
    authForm: authFormReducer,
    modalBackdrop: modalBackdropReducer,
    toast: toastReducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
  useSelector;
