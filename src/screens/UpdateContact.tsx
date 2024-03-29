import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ContactStackParams,
  UpdateParams,
} from '../navigation/stacks/ContactStack';

import CustomInput from '../components/atoms/CustomInput';
import CustomButton from '../components/atoms/CustomButton';
import BackHeader from '../components/molecules/BackHeader';
import ViewContainer from '../components/templates/ViewContainer';
import FormContainer from '../components/templates/FormContainer';

import {useUpdateContact} from '../hooks/useUpdateContact';
import colors from '../styles/colors';

interface UpdateContactProps
  extends NativeStackScreenProps<ContactStackParams, 'Update'> {}

const UpdateContact: FC<UpdateContactProps> = ({route, navigation}) => {
  const {actionType, contact} = route.params as unknown as UpdateParams;

  const {submitForm, formFields, setValues} = useUpdateContact(
    actionType,
    contact ? contact : undefined,
  );

  const title = actionType === 'ADD' ? 'Agregar contacto' : 'Editar contacto';

  return (
    <ViewContainer>
      <BackHeader title={title} />
      <FormContainer>
        <View style={styles.container}>
          <CustomInput
            label="Nombre"
            mode="outlined"
            value={formFields.name}
            onChangeText={setValues('name')}
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

export default UpdateContact;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {marginBottom: 20},
});
