import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomDropdown from '../components/atoms/CustomDropdown';
import CustomInput from '../components/atoms/CustomInput';
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
  const {patients} = useUpdateAppoinment(actionType);

  const title = actionType === 'ADD' ? 'Agregar cita' : 'Editar cita';

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <FormContainer>
        <View style={styles.container}>
          <CustomDropdown title="Paciente" items={patients} />
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
