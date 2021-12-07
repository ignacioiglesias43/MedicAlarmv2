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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppointmentStackParams} from '../navigation/stacks/AppointmentsStack';
import pusher from '../api/pusher';
import {useNotification} from './useNotification';
import {updateModalUserHasConfirmed} from '../store/modal/actionCreators';

export const useAppointments = (
  navigation: NativeStackNavigationProp<AppointmentStackParams, 'Update'>,
) => {
  const {patients} = useSelector((state: RootState) => state.patientReducer);
  const {openModal, userHasConfirmed} = useModal();
  const {appointments} = useSelector(
    (state: RootState) => state.appointmentReducer,
  );
  const {token, userInfo} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const [appointmentList, setAppointmentList] = useState<Appointment[]>();
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now()).toISOString().substr(0, 10),
  );
  const [markedDates, setMarkedDates] = useState([]);
  const {onDisplayNotification} = useNotification();
  const [appSelected, setappSelected] = useState<number>();
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
    if (userInfo?.role !== 'Medic') {
      try {
        const channel = pusher(token).subscribe(
          `private-Appointment.${userInfo?.id}`,
        );
        channel.bind('appointment', (data: any) => {
          onDisplayNotification('appointment', data.message);
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    const dates = new Set(appointments.map(e => e?.day?.substr(0, 10) || ''));
    setMarkedDates([...dates]);
  }, [appointments]);

  useFocusEffect(
    useCallback(() => {
      setAppointmentList(
        appointments.filter(e => selectedDate === e?.day?.substr(0, 10) || ''),
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

  const handleDeteleteAppointment = useCallback(async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      dispatch(updateModalUserHasConfirmed(false));
      const response = await deleteAppointmentService(appSelected!, token);
      if (response) {
        dispatch(deleteAppointment(appSelected!));
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || '';
      openModal(message, false, 'Error');
    } finally {
      dispatch(updateIndicatorVisible(false));
      setappSelected(undefined);
    }
  }, [dispatch, openModal, token, appSelected]);

  const deleteAppoinmentButton = async (id: number) => {
    setappSelected(id);
    openModal('¿Seguro que desea eliminar esta cita?', true);
  };

  useEffect(() => {
    if (userHasConfirmed) handleDeteleteAppointment();
  }, [handleDeteleteAppointment, userHasConfirmed]);

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
