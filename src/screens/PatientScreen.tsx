import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {User} from '../api/user/model/User';
import CustomFAB from '../components/atoms/CustomFAB';
import CustomHeader from '../components/atoms/CustomHeader';
import CustomSearcher from '../components/atoms/CustomSearcher';
import NoDataCard from '../components/atoms/NoDataCard';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';
import {usePacient} from '../hooks/usePatients';
import {PatientStackParams} from '../navigation/stacks/PatientStack';

interface Props extends NativeStackScreenProps<PatientStackParams, 'Patient'> {}

const PatientScreen = ({navigation}: Props) => {
  const {patients} = usePacient();

  const renderItem: ListRenderItem<User> = ({item}) => (
    <DataCard
      title={item.name}
      fisrt={item.email}
      actionIcon={'delete'}
      type="personal"
      action={() => console.log('Hola')}
      onPress={() =>
        navigation.navigate('Details', {patient: item})
      }
    />
  );

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
            <CustomSearcher value={''} onChangeText={() => {}} />
          </CustomHeader>
        )}
        keyExtractor={item => `${item.id}`}
      />
      <CustomFAB
        onPress={() =>
          navigation.navigate('Update', {
            actionType: 'ADD',
          })
        }
      />
    </ViewContainer>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({});
