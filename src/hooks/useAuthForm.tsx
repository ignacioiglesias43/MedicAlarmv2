import {useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {useForm} from './useForm';
import {useNavigation} from '@react-navigation/native';

import {ISignupForm, initialSignupForm} from '../constants/initialSignupForm';
import {ILoginForm, initialLoginForm} from '../constants/initialLoginForm';

import {
  updateToken,
  updateUserInfo,
  updateTokenExpiresAt,
} from '../store/auth/actionCreators';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {
  updateModalMessage,
  updateModalTitle,
  updateModalIconColor,
  updateModalVisible,
  updateModalIcon,
} from '../store/modal/actionCreators';

import {
  ResultedUserLogin,
  ResultedUserSignup,
} from '../api/auth/dto/resulted-user.dto';
import {signupService, loginService} from '../api/auth/services';

import colors from '../styles/colors';

export const useAuthForm = (formType: FormType) => {
  const {formFields, createChangeHandler} = useForm<ILoginForm, ISignupForm>(
    formType === 'LOGIN' ? initialLoginForm : initialSignupForm,
  );

  const [userType, setUserType] = useState<UserType>('Patient');
  const [passwordIcons, setPasswordIcons] = useState({
    password: 'eye',
    repeatPassword: 'eye',
  });

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onUserTypeChange = (newValue: string) => {
    setUserType(newValue as UserType);
    if (newValue === 'Doctor') {
      dispatch(updateModalTitle('Aviso'));
      dispatch(
        updateModalMessage(
          'Los médicos requieren de un código para registrarse. Consulte su centro de atención para más detalles',
        ),
      );
      dispatch(updateModalIcon('alert-decagram'));
      dispatch(updateModalIconColor(colors.warning));
      dispatch(updateModalVisible(true));
    }
  };

  const changePasswordIcon = (
    passwordKey: 'password' | 'repeatPassword',
    newValue: 'eye' | 'eye-off',
  ) =>
    setPasswordIcons({
      ...passwordIcons,
      [passwordKey]: newValue,
    });

  const submitForm = async () => {
    try {
      const result =
        formType === 'LOGIN'
          ? await handleLogin(formFields as ILoginForm)
          : await handleSignup(formFields as ISignupForm);

      if (result) {
        if (formType === 'LOGIN') {
          const {user, ...rest} = result.data as ResultedUserLogin;
          dispatch(
            updateUserInfo({
              ...user,
              role: rest.role,
            }),
          );
          dispatch(updateTokenExpiresAt(rest.expires_at));
          dispatch(updateToken(rest.access_token));
          dispatch(updateIndicatorVisible(false));
        } else {
          const {message} = result.data as ResultedUserSignup;
          dispatch(updateIndicatorVisible(false));
          dispatch(updateModalTitle('Se ha registrado correctamente'));
          dispatch(updateModalMessage(message));
          dispatch(updateModalIcon('check-decagram'));
          dispatch(updateModalIconColor(colors.success));
          dispatch(updateModalVisible(true));
          navigation.goBack();
        }
      }
    } catch (error: any) {
      console.log(error);
      dispatch(updateIndicatorVisible(false));
      if (error.response) {
        console.log(error.response);
        dispatch(updateModalTitle('Error'));
        dispatch(updateModalMessage(error?.response?.data?.message || ''));
        dispatch(updateModalIcon('alert-decagram'));
        dispatch(updateModalIconColor(colors.error));
        dispatch(updateModalVisible(true));
      }
    }
  };

  const handleLogin = (fields: ILoginForm) => {
    const {email, password} = fields;
    if (email.trim() && password.trim()) {
      dispatch(updateIndicatorVisible(true));
      return loginService({
        email,
        password,
      });
    } else {
      dispatch(updateModalTitle('Advertencia'));
      dispatch(updateModalMessage('Todos los campos son necesarios.'));
      dispatch(updateModalIcon('alert-decagram'));
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
      key,
    } = fields;
    if (
      name.trim() &&
      lastname.trim() &&
      email.trim() &&
      phone.trim() &&
      password.trim() &&
      repeatPassword?.trim() &&
      (key?.trim() || userType === 'Patient')
    ) {
      if (password === repeatPassword) {
        dispatch(updateIndicatorVisible(true));
        return signupService({
          email,
          lastname,
          name,
          password,
          phone,
          key,
        });
      } else {
        dispatch(updateModalTitle('Advertencia'));
        dispatch(updateModalMessage('Las contraseñas no coinciden.'));
        dispatch(updateModalIcon('alert-decagram'));
        dispatch(updateModalIconColor(colors.warning));
        dispatch(updateModalVisible(true));
      }
    } else {
      dispatch(updateModalTitle('Advertencia'));
      dispatch(updateModalMessage('Todos los campos son necesarios.'));
      dispatch(updateModalIcon('alert-decagram'));
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
    passwordIcons,
    changePasswordIcon,
    setValues: createChangeHandler,
  };
};
