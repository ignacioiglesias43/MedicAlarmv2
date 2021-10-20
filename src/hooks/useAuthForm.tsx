import {useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {useForm} from './useForm';

import {ISignupForm, initialSignupForm} from '../constants/initialSignupForm';
import {ILoginForm, initialLoginForm} from '../constants/initialLoginForm';

import {updateToken} from '../store/auth/actionCreators';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';

// TODO: Descomentar y reemplazarlo por la logica necesaria

export const useAuthForm = (formType: FormType) => {
  const {formFields, createChangeHandler} = useForm<ILoginForm, ISignupForm>(
    formType === 'LOGIN' ? initialLoginForm : initialSignupForm,
  );

  const [userType, setUserType] = useState<UserType>();
  const dispatch = useAppDispatch();

  const onUserTypeChange = (newValue: string) =>
    setUserType(newValue as UserType);

  const submitForm = () => {
    if (formType === 'LOGIN') {
      handleLogin(formFields as ILoginForm);
    } else {
      handleSignup(formFields as ISignupForm);
    }
  };

  const handleLogin = (fields: ILoginForm) => {
    const {email, password} = fields;
    /* TODO DELETE THIS SETITMEOUT AFTER CONSUMING WS, THIS IS JUST FOR DEMONSTRATION */
    dispatch(updateIndicatorVisible(true));

    setTimeout(() => {
      dispatch(updateToken('12345'));
      dispatch(updateIndicatorVisible(false));
    }, 500);

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
      lastname = '',
      email,
      phone,
      password,
      repeatPassword,
    } = fields;
    if (name && lastname && email && phone && password && repeatPassword) {
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
    userType,
    onUserTypeChange,
    setValues: createChangeHandler,
  };
};
