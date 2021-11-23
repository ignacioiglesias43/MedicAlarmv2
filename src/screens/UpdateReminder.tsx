import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ReminderStackParams,
  UpdateParams,
} from '../navigation/stacks/ReminderStack';

import BackHeader from '../components/molecules/BackHeader';
import CustomButton from '../components/atoms/CustomButton';
import CustomInput from '../components/atoms/CustomInput';
import CustomDropdown from '../components/atoms/CustomDropdown';
import CustomDatePicker from '../components/atoms/CustomDatePicker';
import ViewContainer from '../components/templates/ViewContainer';
import FormContainer from '../components/templates/FormContainer';

import {useUpdateReminder} from '../hooks/useUpdateReminder';
import colors from '../styles/colors';

interface Props extends NativeStackScreenProps<ReminderStackParams, 'Update'> {}

const UpdateReminder = ({route, navigation}: Props) => {
  const {actionType} = route.params as unknown as UpdateParams;
  const {formFields, setValues, contacts, monitoring, saveReminder, date} =
    useUpdateReminder(actionType, route, navigation);

  const cancel = () => navigation.goBack();

  const title = actionType === 'ADD' ? 'Agregar alarma' : 'Editar alarma';

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <FormContainer>
        <View style={styles.container}>
          <CustomInput
            label="Asunto"
            value={formFields.description!}
            onChangeText={setValues('description')}
            style={styles.input}
          />
          <CustomInput
            label="Repeticiones"
            value={`${formFields.days}`}
            onChangeText={setValues('days')}
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
          <CustomDatePicker
            title="Hora inicial"
            minimumDate={new Date(Date.now())}
            date={date.value}
            mode="time"
            handleDate={date.handle}
          />
          <View style={styles.checkContainer}>
            <Text style={styles.checkText}>Monitorear alarma:</Text>
            <Checkbox
              status={monitoring.status ? 'checked' : 'unchecked'}
              onPress={() => {
                monitoring.handle();
              }}
            />
          </View>
          {monitoring.status ? (
            <CustomDropdown
              title="Contacto de confianza"
              items={contacts}
              placeholder={{
                label: 'Seleccione un contacto de confianza',
                value: formFields.contact,
              }}
              onValueChange={value => setValues('contact')(value)}
              value={formFields.contact}
            />
          ) : null}
          <CustomButton
            text="Guardar"
            color={colors.accent}
            style={styles.button}
            onPress={saveReminder}
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
