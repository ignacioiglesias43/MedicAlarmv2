import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Appointment} from '../api/appointments/model/Appointment';
import {getAppointmentService} from '../api/appointments/services';
import {useAppDispatch} from '../store/hooks';
import {updateAppointmets} from '../store/appoinment/actionCreators';
import {useFocusEffect} from '@react-navigation/core';
import { useDateText } from './useDateText';

export interface AppointmentCard {
  id: number;
  date: string;
  name: string | undefined;
}

export const useAppointments = () => {
  const {appointments} = useSelector(
    (state: RootState) => state.appointmentReducer,
  );
  const {token, userInfo} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const [appointmentList, setAppointmentList] = useState<AppointmentCard[]>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    getAppointments();
  }, [token]);

  //TODO: Sacar el nombre
  useFocusEffect(
    useCallback(() => {
      setAppointmentList(
        appointments.map(e => {
          return {
            id: e.id,
            date: e.day.substr(0, 16).replace(/-/g,"/").split('T').join(" "),
            name: userInfo?.role === 'Medic' ? 'Charly' : e.medic?.name,
          };
        }),
      );
    }, [appointments]),
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

  return {appointments: appointmentList};
};
