import {useState} from 'react';

export const useForm = <T, U = T>(initialValues: T | U) => {
  const [formFields, setFormFields] = useState<T | U>(initialValues);
  const createChangeHandler = (key: keyof T | keyof U) => (value: string) =>
    setFormFields((prev: T | U) => ({...prev, [key]: value}));
  return {formFields, createChangeHandler};
};
