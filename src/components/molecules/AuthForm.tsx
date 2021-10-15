import React, {FC} from 'react';
import {RadioButton, Text, Caption} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import CustomButton from '../atoms/CustomButton';
import CustomInput from '../atoms/CustomInput';

import {useAuthForm} from '../../hooks/useAuthForm';

import colors from '../../styles/colors';

interface AuthFormProps {
  formType: FormType;
}

const AuthForm: FC<AuthFormProps> = ({formType, children}) => {
  const {formFields, setValues, submitForm, onUserTypeChange, userType} =
    useAuthForm(formType);

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {formType === 'REGISTER' && (
          <View style={styles.rowInput}>
            <View style={[styles.inputWrap, styles.firstInput]}>
              <CustomInput
                label="Nombre"
                mode="outlined"
                value={formFields.name}
                onChangeText={setValues('name')}
              />
            </View>
            <View style={styles.inputWrap}>
              <CustomInput
                label="Apellidos"
                mode="outlined"
                value={formFields.lastName}
                onChangeText={setValues('lastName')}
              />
            </View>
          </View>
        )}
        <CustomInput
          label="Correo electrónico"
          mode="outlined"
          value={formFields.email}
          keyboardType="email-address"
          onChangeText={setValues('email')}
        />
        <CustomInput
          label="Contraseña"
          mode="outlined"
          icon="eye"
          value={formFields.password}
          onChangeText={setValues('password')}
        />
        {formType === 'REGISTER' && (
          <>
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
              keyboardType="phone-pad"
              value={formFields.phone}
              onChangeText={setValues('phone')}
            />
          </>
        )}
        {formType === 'REGISTER' && (
          <View style={styles.buttons}>
            <Caption style={styles.subh}>Registrarme como:</Caption>
            <RadioButton.Group
              onValueChange={onUserTypeChange}
              value={userType!}>
              <View style={styles.radios}>
                <View style={styles.radio}>
                  <Text style={{color: colors.textOnImage}}>Paciente</Text>
                  <RadioButton value="Patient" />
                </View>
                <View style={styles.radio}>
                  <Text style={{color: colors.textOnImage}}>Médico</Text>
                  <RadioButton value="Doctor" />
                </View>
              </View>
            </RadioButton.Group>
          </View>
        )}
        <CustomButton
          dark
          mode="contained"
          text={formType === 'REGISTER' ? 'Registrarme' : 'Iniciar sesión'}
          color={colors.accent}
          style={styles.button}
          onPress={submitForm}
        />
        {children}
      </KeyboardAwareScrollView>
    </>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
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
  button: {
    marginTop: 20,
  },
  rowInput: {
    flex: 1,
    flexDirection: 'row',
  },
  inputWrap: {flex: 1},
  firstInput: {
    marginRight: 10,
  },
  subh: {
    marginRight: 10,
    marginTop: 21,
    color: colors.textOnImage,
    fontSize: 14,
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});
