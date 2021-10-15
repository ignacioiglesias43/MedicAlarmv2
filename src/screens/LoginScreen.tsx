import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading} from 'react-native-paper';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../navigation/stacks/AuthStack';

import CustomButton from '../components/atoms/CustomButton';
import CustomInput from '../components/atoms/CustomInput';
import AuthHeader from '../components/molecules/AuthHeader';
import ViewContainer from '../components/templates/ViewContainer';

import {useAuthForm} from '../hooks/useAuthForm';

import colors from '../styles/colors';

interface LoginProps extends NativeStackScreenProps<AuthStackParams, 'Login'> {}

const LoginScreen: FC<LoginProps> = ({navigation}) => {
  const {formFields, setValues, submitForm} = useAuthForm('LOGIN');

  const signupBtn = () => navigation.navigate('Signup');

  return (
    <ViewContainer primary childrenStyle={styles.container}>
      <AuthHeader />
      <CustomInput
        label="Correo electrónico"
        mode="outlined"
        value={formFields.email}
        onChangeText={setValues('email')}
      />
      <CustomInput
        label="Contraseña"
        mode="outlined"
        icon="eye"
        value={formFields.password}
        onChangeText={setValues('password')}
      />
      <CustomButton
        dark
        mode="contained"
        text="Iniciar Sesión"
        color={colors.accent}
        style={styles.button}
        onPress={submitForm}
      />
      <CustomButton
        dark
        mode="outlined"
        text="Olvidé mi contraseña"
        color={colors.accent}
        style={styles.button}
      />
      <View style={styles.bottom}>
        <Subheading style={styles.dontHaveAccount}>
          ¿No tienes cuenta?
        </Subheading>
        <CustomButton
          dark
          mode="text"
          text="Regístrate aquí"
          color={colors.accent}
          style={styles.button}
          onPress={signupBtn}
        />
      </View>
    </ViewContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
  bottom: {
    marginVertical: 20,
  },
  dontHaveAccount: {
    color: colors.titleWhite,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: -10,
  },
});
