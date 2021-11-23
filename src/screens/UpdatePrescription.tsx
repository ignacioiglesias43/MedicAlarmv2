import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import CustomButton from '../components/atoms/CustomButton';
import CustomDropdown from '../components/atoms/CustomDropdown';

import CustomInput from '../components/atoms/CustomInput';
import BackHeader from '../components/molecules/BackHeader';
import ViewContainer from '../components/templates/ViewContainer';
import FormContainer from '../components/templates/FormContainer';

import useUpdatePrescription from '../hooks/useUpdatePrescription';
import {
  PatientStackParams,
  UpdateParams,
} from '../navigation/stacks/PatientStack';
import colors from '../styles/colors';
import {Medicine} from '../api/medicines/model/Medicines';
import CustomPickerSearch from '../components/atoms/CustomPickerSearch';

interface Props extends NativeStackScreenProps<PatientStackParams, 'Patient'> {}

const UpdatePrescription = ({route, navigation}: Props) => {
  const {actionType, code} = route.params as unknown as UpdateParams;
  const {formFields, setValues, medicines, handleQuery, handleSubmit} =
    useUpdatePrescription(actionType, code);

  const cancel = () => navigation.goBack();

  const title = actionType === 'ADD' ? 'Agregar receta' : 'Editar receta';

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <View style={styles.container}>
        <CustomPickerSearch
          title="Medicamento"
          data={medicines}
          onChangeText={handleQuery}
          placeholder={formFields.medicament?.name}
          onSelect={(value: Medicine) => setValues('medicament')(value)}
        />
        <CustomInput
          label="Frecuencia"
          value={`${formFields.frecuency}`}
          onChangeText={setValues('frecuency')}
          style={styles.input}
        />
        <CustomInput
          label="Días"
          value={`${formFields.interval}`}
          onChangeText={setValues('interval')}
          style={styles.input}
        />
        <CustomButton
          dark
          mode="contained"
          text="Guardar"
          color={colors.accent}
          style={styles.button}
          onPress={handleSubmit}
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

export default UpdatePrescription;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {marginBottom: 20},
});
