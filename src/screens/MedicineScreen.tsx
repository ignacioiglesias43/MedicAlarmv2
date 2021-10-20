import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {Medicine} from '../api/medicines/model/Medicines';
import CustomFAB from '../components/atoms/CustomFAB';
import CustomHeader from '../components/atoms/CustomHeader';
import CustomSearcher from '../components/atoms/CustomSearcher';
import NoDataCard from '../components/atoms/NoDataCard';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';
import {useMedicines} from '../hooks/useMedicines';
import {MedicineStackParams} from '../navigation/stacks/MedicineStack';

interface Props
  extends NativeStackScreenProps<MedicineStackParams, 'Medicine'> {}

const MedicineScreen = ({navigation}: Props) => {
  const {medicines} = useMedicines();

  const renderItem: ListRenderItem<Medicine> = ({item}) => (
    <DataCard
      title={item.name}
      fisrt={`Via de administración: ${item.via_admin}`}
      actionIcon="delete"
      type="personal"
      action={() => console.log('Hola')}
      onPress={() =>
        navigation.navigate('Update', {medicine: item, actionType: 'UPDATE'})
      }
    />
  );

  return (
    <ViewContainer>
      <FlatList
        data={medicines}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <NoDataCard text="No se han agregado contactos." />
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

export default MedicineScreen;

const styles = StyleSheet.create({});
