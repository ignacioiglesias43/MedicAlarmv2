import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {Prescription} from '../api/prescriptions/model/Prescription';
import CustomFAB from '../components/atoms/CustomFAB';
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

const PatientDetails = ({route, navigation}: Props) => {
  const {patient} = route.params as unknown as DetailsParams;
  const {prescriptions} = usePatientMedicines(patient.code!);

  React.useEffect(() => {
    console.log(prescriptions);
  }, []);

  const renderItem: ListRenderItem<Prescription> = ({item}) => (
    <DataCard
      title={item.medicament?.name!}
      fisrt={`Cada: ${item.interval} hrs`}
      second={`Hasta: ${item.duration.substr(0, 11)}`}
      actionIcon="delete"
      type="personal"
      action={() => console.log('Hoa')}
      onPress={() =>
        navigation.navigate('Update', {
          prescription: item,
          code: patient.code!,
          actionType: 'UPDATE',
        })
      }
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
        />
      </View>
      <CustomFAB
        onPress={() =>
          navigation.navigate('Update', {
            actionType: 'ADD',
            code: patient.code!,
          })
        }
      />
    </ViewContainer>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 15,
  },
});
