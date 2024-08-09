import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

const useForm = <T extends string>(fields: T[]) => {
  const defaultErrors = fields.reduce(
    (acc, field) => ({ ...acc, [field]: null }),
    {} as Record<T | 'form', string | null>
  );
  const [values, setValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {} as Record<T, string>)
  );
  const [errors, setErrors] = useState(defaultErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [validators, setValidators] = useState<
    Partial<Record<T, (value: string) => string | null>>
  >({});
  const [focusField, setFocusField] = useState<T | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      console.log('handleChange')
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      if (errors[name as T]) setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    },
    [errors]
  );

  const handleSubmit =
    (onSubmit: (values: Record<T, string>) => Promise<void>, onSuccess?: () => void) =>
    async (event: FormEvent) => {
      event.preventDefault();
      setErrors(defaultErrors);

      const newErrors = fields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: validators[field] ? validators[field]!(values[field]) : null,
        }),
        {} as Record<T | 'form', string | null>
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
      setErrors(newErrors);
      setFocusField(fields.find((field) => newErrors[field] !== null) || null);
      setIsLoading(true);

      try {
        if (Object.values(newErrors).every((error) => error === null)) {
          await onSubmit(values);
          if (onSuccess) onSuccess();
        }
      } catch (error) {
        const { name = 'form', message = '알 수 없는 오류가 발생했습니다.' } =
          error instanceof Error ? error : {};
        setErrors((prev) => ({
          ...prev,
          [name]: message,
        }));
      } finally {
        setIsLoading(false);
      }
    };

  const register = useCallback(
    (
      name: T,
      validate?: (value: string, values?: Record<T, string>) => string | null
    ) => {
      console.log('register', name)
      if (validate && !validators[name]) {
        setValidators((prev) => ({
          ...prev,
          [name]: (value: string) => validate(value, values),
        }));
      }
      return {
        name,
        value: values[name],
        error: errors[name],
        onChange: handleChange,
        isFocus: focusField === name,
      };
    },
    [values, errors, validators, handleChange, focusField]
  );
  return {
    isLoading,
    values,
    handleSubmit,
    register,
    commonError: errors.form,
  };
};

export default useForm;
