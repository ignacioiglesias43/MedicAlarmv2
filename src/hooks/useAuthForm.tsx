import {useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {useForm} from './useForm';

import {ISignupForm, initialSignupForm} from '../constants/initialSignupForm';
import {ILoginForm, initialLoginForm} from '../constants/initialLoginForm';

import {updateToken} from '../store/auth/actionCreators';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {
  updateModalMessage,
  updateModalTitle,
  updateModalIconColor,
  updateModalVisible,
  updateModalIcon,
} from '../store/modal/actionCreators';

import colors from '../styles/colors';

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
    if (email && password) {
      dispatch(updateIndicatorVisible(true));

      setTimeout(() => {
        dispatch(updateToken('12345'));
        dispatch(updateIndicatorVisible(false));
      }, 500);
    } else {
      dispatch(updateModalTitle('Advertencia'));
      dispatch(updateModalMessage('Todos los campos son necesarios.'));
      dispatch(updateModalIcon('alert-circle-outline'));
      dispatch(updateModalIconColor(colors.warning));
      dispatch(updateModalVisible(true));
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
        dispatch(updateModalTitle('Advertencia'));
        dispatch(updateModalMessage('Las contraseñas no coinciden.'));
        dispatch(updateModalIcon('alert-circle-outline'));
        dispatch(updateModalIconColor(colors.warning));
        dispatch(updateModalVisible(true));
      }
    } else {
      dispatch(updateModalTitle('Advertencia'));
      dispatch(updateModalMessage('Todos los campos son necesarios.'));
      dispatch(updateModalIcon('alert-circle-outline'));
      dispatch(updateModalIconColor(colors.warning));
      dispatch(updateModalVisible(true));
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
