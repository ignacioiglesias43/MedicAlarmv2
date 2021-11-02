import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import CustomDatePicker from '../components/atoms/CustomDatePicker';
import CustomDropdown from '../components/atoms/CustomDropdown';
import BackHeader from '../components/molecules/BackHeader';
import FormContainer from '../components/templates/FormContainer';
import ViewContainer from '../components/templates/ViewContainer';
import {useUpdateAppoinment} from '../hooks/useUpdateAppoinment';
import {
  AppointmentStackParams,
  UpdateParams,
} from '../navigation/stacks/AppointmentsStack';
import colors from '../styles/colors';

interface Props
  extends NativeStackScreenProps<AppointmentStackParams, 'Update'> {}

const UpdateAppoinment = ({route, navigation}: Props) => {
  const {actionType, appoinment} = route.params as unknown as UpdateParams;
  const {patients, date, submitForm} = useUpdateAppoinment(actionType);

  const title = actionType === 'ADD' ? 'Agregar cita' : 'Editar cita';

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <FormContainer>
        <View style={styles.container}>
          <CustomDropdown title="Paciente" items={patients} />
          <CustomDatePicker
            title="Fecha"
            date={date.value}
            handleDate={date.handle}
          />
          <CustomButton
            dark
            mode="contained"
            text="Guardar"
            color={colors.accent}
            style={styles.button}
            onPress={submitForm}
          />
          <CustomButton
            dark
            mode="outlined"
            text="Cancelar"
            color={colors.accent}
            onPress={() => navigation.goBack()}
          />
        </View>
      </FormContainer>
    </ViewContainer>
  );
};

export default UpdateAppoinment;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  checkText: {
    fontSize: 16,
    color: colors.text,
  },
  button: {marginBottom: 20},
});
