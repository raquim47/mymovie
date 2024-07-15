import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import authFormReducer from './auth-form';
import modalBackdropReducer from './modal-backdrop';

export const store = configureStore({
  reducer: {
    user: userReducer,
    authForm: authFormReducer,
    modalBackdrop: modalBackdropReducer,
  },
});
