import {useForm} from './useForm';

const useAddPatient = () => {
  const {createChangeHandler, formFields} = useForm<{id: string}, {id: string}>(
    {
      id: '',
    },
  );

  return {
    formFields,
    setValues: createChangeHandler,
  };
};

export default useAddPatient;
