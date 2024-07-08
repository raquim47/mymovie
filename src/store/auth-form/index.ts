import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData, IFormState } from './types';

const initialErrors = {
  email: '',
  displayName: '',
  password: '',
  confirmPassword: '',
};

const initialState: IFormState = {
  formData: {
    email: '',
    displayName: '',
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
    setErrors: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    resetErrors: (state) => {
      state.errors = initialErrors;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, setErrors, resetErrors, resetForm } = authFormSlice.actions;
export default authFormSlice.reducer;
