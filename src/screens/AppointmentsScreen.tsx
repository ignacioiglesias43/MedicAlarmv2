import React from 'react';
import {ListRenderItem, FlatList, StyleSheet, View} from 'react-native';
import DataCard from '../components/molecules/DataCard';
import Calendar from '../components/organisms/Calendar';
import ViewContainer from '../components/templates/ViewContainer';
import {useAppointments} from '../hooks/useAppointments';
import {Divider} from 'react-native-paper';
import CustomFAB from '../components/atoms/CustomFAB';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppointmentStackParams} from '../navigation/stacks/AppointmentsStack';
import NoDataCard from '../components/atoms/NoDataCard';
import {Appointment} from '../api/appointments/model/Appointment';
interface Props
  extends NativeStackScreenProps<
    AppointmentStackParams,
    'Update'
  > {}

const AppointmentsScreen = ({navigation}: Props) => {
  const {userInfo} = useSelector((state: RootState) => state.authReducer);
  const {appointments, deleteAppoinmentButton, selectedDate, markedDates, addAppoinment} =
    useAppointments(navigation);

  const onUpdateAppointment = (item: Appointment) => {
    navigation.navigate('Update', {actionType: 'UPDATE', appoinment: item});
  };

  const renderItem: ListRenderItem<Appointment> = ({item}) => (
    <DataCard
      title={`${userInfo?.role !== 'Medic' ? 'Dr. ' : ''}${
        item.medic?.name || item.patient?.name
      }`}
      fisrt={`Hora: ${item.day.substr(11, 5)}`}
      type="citation"
      actionIcon={userInfo?.role === 'Medic' && 'delete'}
      action={() => deleteAppoinmentButton(item.id)}
      onPress={() => {
        if (userInfo?.role === 'Medic') {
          onUpdateAppointment(item);
        }
      }}
    />
  );

  return (
    <ViewContainer>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        style={styles.container}
        ListEmptyComponent={() => (
          <NoDataCard text="No hay citas agendadas para este día." />
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Calendar
                selectedDate={selectedDate.value}
                handleSelectedDate={selectedDate.handle}
                markedDates={markedDates}
              />
            </View>
            <Divider style={styles.container} />
          </>
        )}
        keyExtractor={item => `${item.id}`}
      />
      <>
        {userInfo?.role === 'Medic' && (
          <CustomFAB
            onPress={addAppoinment}
          />
        )}
      </>
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
