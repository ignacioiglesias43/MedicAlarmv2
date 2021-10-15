import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../navigation/stacks/AuthStack';

import CustomButton from '../components/atoms/CustomButton';
import CustomInput from '../components/atoms/CustomInput';
import AuthHeader from '../components/molecules/AuthHeader';
import ViewContainer from '../components/templates/ViewContainer';

import {useAuthForm} from '../hooks/useAuthForm';

import colors from '../styles/colors';

interface SignupProps
  extends NativeStackScreenProps<AuthStackParams, 'Signup'> {}

const SignupScreen: FC<SignupProps> = () => {
  const {formFields, setValues, submitForm, userType, onUserTypeChange} =
    useAuthForm('REGISTER');

  return (
    <ViewContainer primary childrenStyle={styles.container}>
      <AuthHeader />
      <CustomInput
        label="Nombre"
        mode="outlined"
        value={formFields.name}
        onChangeText={setValues('name')}
      />
      <CustomInput
        label="Apellidos"
        mode="outlined"
        value={formFields.lastName}
        onChangeText={setValues('lastName')}
      />
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
      <CustomInput
        label="Confirmar contraseña"
        mode="outlined"
        icon="eye"
        value={formFields.repeatPassword}
        onChangeText={setValues('repeatPassword')}
      />
      <CustomInput
        label="Teléfono"
        mode="outlined"
        icon="eye"
        value={formFields.phone}
        onChangeText={setValues('phone')}
      />
      <RadioButton.Group onValueChange={onUserTypeChange} value={userType!}>
        <View style={styles.radios}>
          <View style={styles.radio}>
            <Text>Paciente</Text>
            <RadioButton value="Patient" />
          </View>
          <View style={styles.radio}>
            <Text>Médico</Text>
            <RadioButton value="Doctor" />
          </View>
        </View>
      </RadioButton.Group>
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
  radios: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});
