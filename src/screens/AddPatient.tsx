import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import CustomInput from '../components/atoms/CustomInput';
import BackHeader from '../components/molecules/BackHeader';
import ViewContainer from '../components/templates/ViewContainer';
import {useAddPatient} from '../hooks/useAddPatient';
import colors from '../styles/colors';

const UpdatePatient = () => {
  const navigation = useNavigation();
  const {code, setCode, submitCode} = useAddPatient();

  return (
    <ViewContainer>
      <BackHeader title="Agregar paciente" />
      <View style={styles.container}>
        <CustomInput
          label="Código"
          mode="outlined"
          placeholder="XXXXX-XXXXX"
          maxLength={11}
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
          style={styles.input}
        />
        <CustomButton
          dark
          mode="contained"
          text="Guardar"
          color={colors.accent}
          style={styles.button}
          onPress={submitCode}
        />
        <CustomButton
          dark
          mode="outlined"
          text="Cancelar"
          color={colors.accent}
          onPress={() => {
            navigation.goBack();
          }}
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
