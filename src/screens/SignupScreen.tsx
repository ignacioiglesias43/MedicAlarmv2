import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../navigation/stacks/AuthStack';

import CustomButton from '../components/atoms/CustomButton';
import AuthHeader from '../components/molecules/AuthHeader';
import AuthForm from '../components/molecules/AuthForm';
import ViewContainer from '../components/templates/ViewContainer';

import colors from '../styles/colors';

interface SignupProps
  extends NativeStackScreenProps<AuthStackParams, 'Signup'> {}

const SignupScreen: FC<SignupProps> = ({navigation}) => {
  const loginBtn = () => navigation.navigate('Login');

  return (
    <ViewContainer primary childrenStyle={styles.container}>
      <AuthHeader />
      <AuthForm formType="REGISTER">
        <CustomButton
          dark
          mode="outlined"
          text="Iniciar sesión"
          color={colors.accent}
          style={styles.button}
          onPress={loginBtn}
        />
      </AuthForm>
    </ViewContainer>
  );
};

export default SignupScreen;

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
});
