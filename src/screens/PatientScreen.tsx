import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {Patient} from '../api/patient/model/Patient';
import CustomFAB from '../components/atoms/CustomFAB';
import CustomHeader from '../components/atoms/CustomHeader';
import CustomSearcher from '../components/atoms/CustomSearcher';
import NoDataCard from '../components/atoms/NoDataCard';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';
import {usePatient} from '../hooks/usePatients';
import {PatientStackParams} from '../navigation/stacks/PatientStack';

interface Props extends NativeStackScreenProps<PatientStackParams, 'Patient'> {}

const PatientScreen = ({navigation}: Props) => {
  const {patients, deletePatientButton, searchFunction, query} = usePatient();

  const renderItem: ListRenderItem<Patient> = ({item}) => {
    const {user} = item;
    return (
      <DataCard
        title={user?.name}
        fisrt={user?.email}
        actionIcon={'delete'}
        type="personal"
        action={() => deletePatientButton(item)}
        onPress={() => navigation.navigate('Details', {patient: user})}
      />
    );
  };

  return (
    <ViewContainer>
      <FlatList
        data={patients}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <NoDataCard text="No se han agregado pacientes." />
        )}
        ListHeaderComponent={() => (
          <CustomHeader>
            <CustomSearcher value={query} onChangeText={searchFunction} />
          </CustomHeader>
        )}
        keyExtractor={(_, index) => `${index}`}
      />
      <CustomFAB onPress={() => navigation.navigate('Add')} />
    </ViewContainer>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({});
