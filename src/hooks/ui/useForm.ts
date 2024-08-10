import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

type Validator<T extends string> = (
  value: string,
  values?: Record<T, string>
) => string | null;
type Values<T extends string> = Record<T, string>;
type Validators<T extends string> = Partial<Record<T, Validator<T>>>;

const getErrors = <T extends string>(
  fields: T[],
  values = {} as Values<T>,
  validators: Validators<T> = {}
) =>
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: validators[field]?.(values[field], values) ?? null,
    }),
    {} as Record<T | 'form', string | null>
  );

const useForm = <T extends string>(fields: T[]) => {
  const [values, setValues] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {} as Values<T>)
  );
  const [errors, setErrors] = useState(() => getErrors(fields));
  const [isLoading, setIsLoading] = useState(false);
  const [validators, setValidators] = useState<Validators<T>>({});
  const [focusField, setFocusField] = useState<T | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (errors[name as T]) setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    },
    [errors]
  );

  const handleSubmit =
    (onSubmit: (values: Values<T>) => Promise<void>, onSuccess?: () => void) =>
    async (event: FormEvent) => {
      event.preventDefault();
      setErrors(getErrors(fields));
      await new Promise((resolve) => setTimeout(resolve, 50));

      const newErrors = getErrors(fields, values, validators);
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
    (name: T, validate?: Validator<T>) => {
      if (validate && !validators[name]) {
        setValidators((prev) => ({
          ...prev,
          [name]: validate,
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
    errors,
  };
};

export default useForm;
