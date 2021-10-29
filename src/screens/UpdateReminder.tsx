import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ReminderStackParams,
  UpdateParams,
} from '../navigation/stacks/ReminderStack';

import CustomButton from '../components/atoms/CustomButton';
import CustomInput from '../components/atoms/CustomInput';
import CustomDropdown from '../components/atoms/CustomDropdown';
import BackHeader from '../components/molecules/BackHeader';
import ViewContainer from '../components/templates/ViewContainer';
import FormContainer from '../components/templates/FormContainer';

import {useUpdateReminder} from '../hooks/useUpdateReminder';
import colors from '../styles/colors';

interface Props
  extends NativeStackScreenProps<ReminderStackParams, 'Reminder'> {}

const UpdateReminder = ({route}: Props) => {
  const {actionType} = route.params as unknown as UpdateParams;
  const {formFields, setValues, contacts} = useUpdateReminder(actionType);
  const [monitoring, setMonitoring] = useState(formFields.monitoring);

  const update = () => {};
  const cancel = () => {};

  const title = actionType === 'ADD' ? 'Agregar alarma' : 'Editar alarma';

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <FormContainer>
        <View style={styles.container}>
          <CustomInput
            label="Asunto"
            value={formFields.name}
            onChangeText={setValues('name')}
            style={styles.input}
          />
          <CustomInput
            label="Repeticiones"
            value={`${formFields.count}`}
            onChangeText={setValues('count')}
            keyboardType="numeric"
            style={styles.input}
          />
          <CustomInput
            label="Frecuencia (horas)"
            value={`${formFields.frecuency}`}
            onChangeText={setValues('frecuency')}
            keyboardType="numeric"
            style={styles.input}
          />
          <CustomInput
            label="Hora inicial"
            value={formFields.next_hour!}
            onChangeText={setValues('next_hour')}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.checkContainer}>
            <Text style={styles.checkText}>Monitorear alarma:</Text>
            <Checkbox
              status={monitoring ? 'checked' : 'unchecked'}
              onPress={() => {
                setMonitoring(!monitoring);
              }}
            />
          </View>
          {monitoring ? (
            <CustomDropdown title="Contacto de confianza" items={contacts} />
          ) : null}
          <CustomButton
            text="Guardar"
            color={colors.accent}
            style={styles.button}
            onPress={update}
            dark
          />
          <CustomButton
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

export default UpdateReminder;

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
