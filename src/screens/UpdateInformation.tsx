import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import CustomButton from '../components/atoms/CustomButton';
import CustomInput from '../components/atoms/CustomInput';
import BackHeader from '../components/molecules/BackHeader';
import ViewContainer from '../components/templates/ViewContainer';

import {useUpdateInfo} from '../hooks/useUpdateInfo';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserStackParams} from '../navigation/stacks/UserStack';

import colors from '../styles/colors';

interface UpdateInformationProps
  extends NativeStackScreenProps<UserStackParams, 'UpdateInformation'> {}

const UpdateInformation: FC<UpdateInformationProps> = ({navigation}) => {
  const {formFields, setValues, update, cancel} = useUpdateInfo(navigation);

  return (
    <ViewContainer>
      <BackHeader title="Editar Información" />
      <View style={styles.container}>
        <CustomInput
          label="Nombre"
          mode="outlined"
          value={formFields.name}
          onChangeText={setValues('name')}
          style={styles.input}
        />
        <CustomInput
          label="Apellidos"
          mode="outlined"
          value={formFields.lastname}
          onChangeText={setValues('lastname')}
          style={styles.input}
        />
        <CustomInput
          label="Correo electrónico"
          mode="outlined"
          keyboardType="email-address"
          value={formFields.email}
          onChangeText={setValues('email')}
          style={styles.input}
        />
        <CustomInput
          label="Teléfono"
          mode="outlined"
          keyboardType="phone-pad"
          value={formFields.phone!}
          onChangeText={setValues('phone')}
          style={styles.input}
        />
        <CustomButton
          dark
          mode="contained"
          text="Guardar"
          color={colors.accent}
          style={styles.button}
          onPress={update}
        />
        <CustomButton
          dark
          mode="outlined"
          text="Cancelar"
          color={colors.accent}
          onPress={cancel}
        />
      </View>
    </ViewContainer>
  );
};

export default UpdateInformation;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {marginBottom: 20},
});
