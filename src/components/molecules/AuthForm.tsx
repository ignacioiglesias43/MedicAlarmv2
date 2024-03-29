import React, {FC} from 'react';
import {RadioButton, Text, Caption, TouchableRipple} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

import CustomButton from '../atoms/CustomButton';
import CustomInput from '../atoms/CustomInput';
import FormContainer from '../templates/FormContainer';

import {useAuthForm} from '../../hooks/useAuthForm';

import colors from '../../styles/colors';

interface AuthFormProps {
  formType: FormType;
}

const AuthForm: FC<AuthFormProps> = ({formType, children}) => {
  const {
    formFields,
    setValues,
    submitForm,
    onUserTypeChange,
    userType,
    passwordIcons,
    changePasswordIcon,
  } = useAuthForm(formType);

  return (
    <FormContainer>
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
              value={formFields.lastname}
              onChangeText={setValues('lastname')}
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
        autoCapitalize="none"
      />
      <CustomInput
        label="Contraseña"
        mode="outlined"
        autoCapitalize="none"
        icon={passwordIcons.password}
        secureTextEntry={passwordIcons.password === 'eye'}
        onIconPress={() =>
          changePasswordIcon(
            'password',
            passwordIcons.password === 'eye' ? 'eye-off' : 'eye',
          )
        }
        value={formFields.password}
        onChangeText={setValues('password')}
      />
      {formType === 'REGISTER' && (
        <>
          <CustomInput
            label="Confirmar contraseña"
            mode="outlined"
            icon={passwordIcons.repeatPassword}
            secureTextEntry={passwordIcons.repeatPassword === 'eye'}
            onIconPress={() =>
              changePasswordIcon(
                'repeatPassword',
                passwordIcons.repeatPassword === 'eye' ? 'eye-off' : 'eye',
              )
            }
            value={formFields.repeatPassword}
            autoCapitalize="none"
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
          <RadioButton.Group onValueChange={onUserTypeChange} value={userType!}>
            <View style={styles.radios}>
              <TouchableRipple
                onPress={() => onUserTypeChange('Patient')}
                style={styles.radio}>
                <View style={styles.radioView}>
                  <Text style={{color: colors.textOnImage}}>Paciente</Text>
                  <RadioButton value="Patient" />
                </View>
              </TouchableRipple>
              <TouchableRipple
                style={styles.radio}
                onPress={() => onUserTypeChange('Doctor')}>
                <View style={styles.radioView}>
                  <Text style={{color: colors.textOnImage}}>Médico</Text>
                  <RadioButton value="Doctor" />
                </View>
              </TouchableRipple>
            </View>
          </RadioButton.Group>
        </View>
      )}
      {formType === 'REGISTER' && userType === 'Doctor' && (
        <>
          <CustomInput
            label="Código de médico"
            value={formFields.key}
            onChangeText={setValues('key')}
          />
        </>
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
    </FormContainer>
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
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
