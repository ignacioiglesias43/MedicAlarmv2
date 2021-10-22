import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {Prescription} from '../api/prescriptions/model/Prescription';
import CustomButton from '../components/atoms/CustomButton';
import NoDataCard from '../components/atoms/NoDataCard';
import BackHeader from '../components/molecules/BackHeader';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';
import {usePatientMedicines} from '../hooks/usePatientMedicines';
import {
  DetailsParams,
  PatientStackParams,
} from '../navigation/stacks/PatientStack';

interface Props extends NativeStackScreenProps<PatientStackParams, 'Patient'> {}

const PatientDetails = ({route}: Props) => {
  const {patient} = route.params as unknown as DetailsParams;
  const {prescriptions} = usePatientMedicines();

  const renderItem: ListRenderItem<Prescription> = ({item}) => (
    <DataCard
      title={item.medicine!.name}
      fisrt={`Cada: ${item.frecuency} hrs`}
      second={`Repetir: ${item.count} veces`}
      actionIcon="delete"
      type="personal"
      action={() => console.log('Hoa')}
    />
  );

  return (
    <ViewContainer>
      <BackHeader title={`${patient.name} ${patient.lastname}`} />
      <View style={styles.list}>
        <FlatList
          data={prescriptions}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <NoDataCard text="No se han agregado recetas." />
          )}
          ListFooterComponent={() => (
            <>
              <CustomButton
                text="Agregar nueva receta"
                dark
                style={styles.button}
              />
              <CustomButton
                text="Eliminar paciente"
                mode="outlined"
                style={styles.button}
              />
            </>
          )}
        />
      </View>
    </ViewContainer>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    flex: 1,
  },
  button: {
    marginTop: 15,
  },
});
