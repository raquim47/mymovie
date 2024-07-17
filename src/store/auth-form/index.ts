import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData, IFormState } from './types';

const initialErrors = {
  email: '',
  nickName: '',
  password: '',
  confirmPassword: '',
};

const initialState: IFormState = {
  formData: {
    email: '',
    nickName: '',
    password: '',
    confirmPassword: '',
  },
  errors: initialErrors,
};

export const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof IFormData; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setFieldError: (
      state,
      action: PayloadAction<{ field: keyof IFormData; error: string }>
    ) => {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },

    resetErrors: (state) => {
      state.errors = initialErrors;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, setFieldError, resetErrors, resetForm } =
  authFormSlice.actions;
export default authFormSlice.reducer;
