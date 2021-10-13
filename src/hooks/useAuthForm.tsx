import {useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {useForm} from './useForm';

import {ISignupForm, initialSignupForm} from '../constants/initialSignupForm';
import {ILoginForm, initialLoginForm} from '../constants/initialLoginForm';

import { updateToken } from '../store/auth/actionCreators';

// TODO: Descomentar y reemplazarlo por la logica necesaria

export const useAuthForm = (formType: FormType) => {
  const {formFields, createChangeHandler} = useForm<ILoginForm, ISignupForm>(
    formType === 'LOGIN' ? initialLoginForm : initialSignupForm,
  );

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitForm = async () => {
    //   TODO
  };

  const handleLogin = (fields: ILoginForm) => {
    const {email, password} = fields;
    dispatch(updateToken("12345"))
    if (email && password) {
    } else {
      /* dispatch(updateModalMessage('All fields are required.'));
      dispatch(updateModalTitle('Warning'));
      dispatch(updateIconColor('inherit'));
      dispatch(updateModalVisible(true)); */
    }
    return null;
  };

  const handleSignup = (fields: ISignupForm) => {
    const {
      name = '',
      lastName = '',
      email,
      phone,
      password,
      repeatPassword,
    } = fields;
    if (name && lastName && email && phone && password && repeatPassword) {
      if (password === repeatPassword) {
      } else {
        /* dispatch(updateModalMessage("Password's do not match."));
        dispatch(updateModalTitle('Warning'));
        dispatch(updateModalVisible(true)); */
      }
    } else {
      /* dispatch(updateModalMessage('All fields but username are required.'));
      dispatch(updateModalTitle('Warning'));
      dispatch(updateModalVisible(true)); */
    }
    return null;
  };

  return {
    formFields,
    submitForm,
    setValues: createChangeHandler,
    isLoading,
  };
};
