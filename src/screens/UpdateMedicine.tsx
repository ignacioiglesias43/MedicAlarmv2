import React from 'react';
import {StyleSheet, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  MedicineStackParams,
  UpdateParams,
} from '../navigation/stacks/MedicineStack';

import CustomInput from '../components/atoms/CustomInput';
import CustomButton from '../components/atoms/CustomButton';
import CustomDropdown from '../components/atoms/CustomDropdown';
import BackHeader from '../components/molecules/BackHeader';
import ViewContainer from '../components/templates/ViewContainer';
import FormContainer from '../components/templates/FormContainer';

import {useUpdateMedicine} from '../hooks/useUpdateMedicine';
import colors from '../styles/colors';

interface Props
  extends NativeStackScreenProps<MedicineStackParams, 'Medicine'> {}

const UpdateMedicine = ({route, navigation}: Props) => {
  const {actionType} = route.params as unknown as UpdateParams;
  const {formFields, setValues, pickerOptions} = useUpdateMedicine(actionType);

  const title =
    actionType === 'ADD' ? 'Agregar medicamento' : 'Editar medicamento';

  const update = () => {};
  const cancel = () => navigation.goBack();

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <FormContainer>
        <View style={styles.container}>
          <CustomInput
            label="Nombre"
            value={formFields.name}
            onChangeText={setValues('name')}
            style={styles.input}
          />
          <CustomDropdown
            title="Via de administración"
            items={pickerOptions}
            placeholder={{
              label: 'Seleccione un contacto de confianza',
              value: formFields.via,
            }}
            value={formFields.via}
            onValueChange={value => setValues('via')(value)}
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

export default UpdateMedicine;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {marginBottom: 20},
});
