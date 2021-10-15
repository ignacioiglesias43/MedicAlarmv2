import {useForm} from './useForm';
import {Contact} from '../api/contact/model/Contact';

export const useUpdateContact = (actionType: 'UPDATE' | 'ADD') => {
  const {createChangeHandler, formFields} = useForm<Contact, Contact>({
    name: actionType === 'UPDATE' ? 'Ignacio Iglesias' : '',
    phone: actionType === 'UPDATE' ? '6122192275' : '',
  });

  return {
    formFields,
    setValues: createChangeHandler,
  };
};
