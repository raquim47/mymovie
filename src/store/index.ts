import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import authFormReducer from './auth-form';

export const store = configureStore({
  reducer: { user: userReducer, authForm: authFormReducer },
});
