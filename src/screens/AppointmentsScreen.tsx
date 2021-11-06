import React from 'react';
import {ListRenderItem, FlatList, StyleSheet, View} from 'react-native';
import {Appointment} from '../api/appointments/model/Appointment';

import DataCard from '../components/molecules/DataCard';
import Calendar from '../components/organisms/Calendar';
import ViewContainer from '../components/templates/ViewContainer';

import {AppointmentCard, useAppointments} from '../hooks/useAppointments';
import {Divider} from 'react-native-paper';
import CustomFAB from '../components/atoms/CustomFAB';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppointmentStackParams} from '../navigation/stacks/AppointmentsStack';
interface Props
  extends NativeStackScreenProps<
    AppointmentStackParams,
    'AppointmentsDashboard'
  > {}

const AppointmentsScreen = ({navigation}: Props) => {
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const {appointments} = useAppointments();

  React.useEffect(() => {
    console.log(appointments)
  }, [])

  const renderItem: ListRenderItem<AppointmentCard> = ({item}) => (
    <DataCard
      title={item.name}
      fisrt={`Fecha: ${item.date}`}
      type="citation"
      action={() => console.log('Hola')}
    />
  );

  return (
    <ViewContainer>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        style={styles.container}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Calendar />
            </View>
            <Divider style={styles.container} />
          </>
        )}
        keyExtractor={item => `${item.id}`}
      />
      {userInfo?.role === 'Medic' && (
        <CustomFAB
          onPress={() =>
            navigation.navigate('Update', {
              actionType: 'ADD',
            })
          }
        />
      )}
    </ViewContainer>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginHorizontal: 0,
  },
  container: {
    marginHorizontal: 5,
  },
});
