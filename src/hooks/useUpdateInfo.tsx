import {User} from '../api/user/model/User';
import {useForm} from './useForm';

export const useUpdateInfo = () => {
  const {createChangeHandler, formFields} = useForm<User, User>({
    name: 'Rubén',
    lastName: 'Sandoval',
    email: 'ruben@gmail.com',
    phone: '6131247038',
  });

  return {
    formFields,
    setValues: createChangeHandler,
  };
};
