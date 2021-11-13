import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Appointment} from '../api/appointments/model/Appointment';
import {
  deleteAppointmentService,
  getAppointmentService,
} from '../api/appointments/services';
import {useAppDispatch} from '../store/hooks';
import {
  deleteAppointment,
  updateAppointmets,
} from '../store/appoinment/actionCreators';
import {useFocusEffect} from '@react-navigation/core';
import {useModal} from './useModal';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import colors from '../styles/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppointmentStackParams} from '../navigation/stacks/AppointmentsStack';

export const useAppointments = (
  navigation: NativeStackNavigationProp<AppointmentStackParams, 'Update'>,
) => {
  const {patients} = useSelector((state: RootState) => state.patientReducer);
  const {openModal, isModalVisible, message} = useModal();
  const {appointments} = useSelector(
    (state: RootState) => state.appointmentReducer,
  );
  const {token} = useSelector((state: RootState) => state.authReducer);
  const [appointmentList, setAppointmentList] = useState<Appointment[]>();
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now()).toISOString().substr(0, 10),
  );
  const [markedDates, setMarkedDates] = useState([]);

  const dispatch = useAppDispatch();

  const handleSelectedDate = (day: string) => setSelectedDate(day);

  const addAppoinment = () => {
    if (patients.length > 0) {
      navigation.navigate('Update', {
        actionType: 'ADD',
      });
    } else {
      openModal('Se necesitan pacientes asignados para esta acción');
    }
  };

  useEffect(() => {
    getAppointments();
  }, [token]);

  useEffect(() => {
    const dates = new Set(appointments.map(e => e.day.substr(0, 10)));
    setMarkedDates([...dates]);
  }, [appointments]);

  useFocusEffect(
    useCallback(() => {
      setAppointmentList(
        appointments.filter(e => selectedDate === e.day.substr(0, 10)),
      );
    }, [selectedDate, appointments]),
  );

  const getAppointments = async () => {
    try {
      const response = await getAppointmentService(token);
      if (response) {
        const {data} = response.data;
        dispatch(updateAppointmets(data));
      }
    } catch (error: any) {
      console.log({...error});
    }
  };

  const deleteAppoinmentButton = async (id: number) => {
    dispatch(updateIndicatorVisible(true));
    //TODO: Modal de confirmación
    try {
      const response = await deleteAppointmentService(id, token);
      if (response) {
        dispatch(deleteAppointment(id));
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || '';
      openModal(message, false, 'Error');
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };

  return {
    appointments: appointmentList,
    deleteAppoinmentButton,
    selectedDate: {
      value: selectedDate,
      handle: handleSelectedDate,
    },
    markedDates,
    addAppoinment,
  };
};
