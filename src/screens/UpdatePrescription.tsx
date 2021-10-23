import React from 'react';
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

interface Props extends NativeStackScreenProps<PatientStackParams, 'Patient'> {}

const UpdatePrescription = ({route}: Props) => {
  const {actionType} = route.params as unknown as UpdateParams;
  const {formFields, setValues} = useUpdatePrescription(actionType);

  const update = () => {};
  const cancel = () => {};

  const title = actionType === 'ADD' ? 'Agregar receta' : 'Editar receta';

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <FormContainer>
        <View style={styles.container}>
          <CustomDropdown title="Medicamento" />
          <CustomInput
            label="Frecuencia"
            value={`${formFields.frecuency}`}
            onChangeText={setValues('frecuency')}
            style={styles.input}
          />
          <CustomInput
            label="Repeticiones"
            value={`${formFields.count}`}
            onChangeText={setValues('count')}
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
      </FormContainer>
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
