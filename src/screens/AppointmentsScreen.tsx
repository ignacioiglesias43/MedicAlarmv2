import React from 'react';
import {ListRenderItem, FlatList, StyleSheet, View} from 'react-native';
import {Appointment} from '../api/appointments/model/Appointment';

import DataCard from '../components/molecules/DataCard';
import Calendar from '../components/organisms/Calendar';
import ViewContainer from '../components/templates/ViewContainer';

import {useAppointments} from '../hooks/useAppointments';
import {Divider} from 'react-native-paper';

const AppointmentsScreen = () => {
  const {appointments} = useAppointments();

  const renderItem: ListRenderItem<Appointment> = ({item}) => (
    <DataCard
      title={item.doctor.name}
      fisrt={`Fecha: ${item.date}`}
      second={`Hora: ${item.hour}`}
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
