import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { ERRORS } from 'utils/errors';

type Validator<T extends string> = (
  value: string,
  values?: Record<T, string>
) => string | null;
type Values<T extends string> = Record<T, string>;
type Validators<T extends string> = Partial<Record<T, Validator<T>>>;

const initializeValues = <T extends string>(
  fields: T[],
  initialValues?: Partial<Values<T>>
): Values<T> =>
  fields.reduce(
    (acc, field) => ({ ...acc, [field]: initialValues?.[field] || '' }),
    {} as Values<T>
  );

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
    { common: null } as Record<T | 'common', string | null>
  );

const useForm = <T extends string>(fields: T[], initialValues?: Partial<Values<T>>) => {
  const [values, setValues] = useState(() => initializeValues(fields, initialValues));
  const [errors, setErrors] = useState(() => getErrors(fields));
  const [isLoading, setIsLoading] = useState(false);
  const [validators, setValidators] = useState<Validators<T>>({});
  const [errorFocus, setErrorFocus] = useState<T | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setErrorFocus(fields.find((field) => newErrors[field] !== null) || null);
      setIsLoading(true);

      try {
        if (Object.values(newErrors).every((error) => error === null)) {
          await onSubmit(values);
          if (onSuccess) onSuccess();
        }
      } catch (error) {
        const { name = 'common', message = ERRORS.REQUEST_ERROR } =
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
        onChange: handleChange,
      };
    },
    [values, validators, handleChange]
  );

  const reset = useCallback(() => {
    setValues((currentValues) =>
      initializeValues(fields, { ...initialValues, ...currentValues })
    );
    setErrors(getErrors(fields));
    setErrorFocus(null);
  }, [fields, initialValues]);
  return {
    isLoading,
    values,
    handleSubmit,
    setErrors,
    register,
    errors,
    errorFocus,
    reset,
  };
};

export default useForm;
