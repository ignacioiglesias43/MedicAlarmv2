import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import CustomInput from '../components/atoms/CustomInput';
import BackHeader from '../components/molecules/BackHeader';
import ViewContainer from '../components/templates/ViewContainer';
import useAddPatient from '../hooks/useAddPatient';
import colors from '../styles/colors';

const UpdatePatient = () => {
  const {formFields, setValues} = useAddPatient();
  const update = () => {};
  const cancel = () => {};

  return (
    <ViewContainer>
      <BackHeader title="Agregar paciente" />
      <View style={styles.container}>
        <CustomInput
          label="Código"
          mode="outlined"
          value={formFields.id}
          onChangeText={setValues('id')}
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

export default UpdatePatient;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {marginBottom: 20},
});
