import {useNavigation} from '@react-navigation/core';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ResultedAppoinmentCreate} from '../api/appointments/dto/resulted-appointment.dto';
import {Appointment} from '../api/appointments/model/Appointment';
import {
  addAppointmentService,
  updateAppointmentService,
} from '../api/appointments/services';
import {
  addAppointment,
  updateAppointmets,
  updateSingleAppointment,
} from '../store/appoinment/actionCreators';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {useFormatedDate} from './useDateText';
import {useModal} from './useModal';

export const useUpdateAppoinment = (
  actionType: 'UPDATE' | 'ADD',
  appoinment?: Appointment | undefined,
) => {
  const {patients} = useAppSelector((state: RootState) => state.patientReducer);
  const [date, setDate] = useState(
    actionType === 'UPDATE'
      ? new Date(Date.parse(appoinment?.day!))
      : new Date(),
  );
  const {openModal} = useModal();
  const {token} = useSelector((state: RootState) => state.authReducer);
  const [patient, setPatient] = useState(
    actionType === 'UPDATE' ? appoinment?.patient?.code : patients[0].user.code,
  );
  const fDate = useFormatedDate(date.toISOString());
  const patientList = patients.map(a => ({
    name: a.user.name,
    id: a.user.code,
  }));

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleDate = (date: Date) => setDate(date);
  const handlePatient = (patient: any) => setPatient(patient);

  const submitForm = async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      const result =
        actionType === 'UPDATE'
          ? await handleUpdate(appoinment?.id!, patient!, fDate)
          : await handleAdd(patient!, fDate);
      if (result) {
        const {data} = result.data as ResultedAppoinmentCreate;
        //TODO Corregir esto cuando se corriga el back
        /* 
        if (actionType === 'UPDATE') {
          dispatch(updateSingleAppointment(data));
        } else {
          dispatch(addAppointment(data));
        }*/
        dispatch(updateAppointmets(data));
        navigation.goBack();
      }
    } catch (error: any) {
      openModal(error?.response?.data?.message || '');
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };

  const handleAdd = (patient: string, day: string) => {
    const data = {patient, day};
    return addAppointmentService(data, token);
  };

  const handleUpdate = (id: number, _patient: string, day: string) => {
    const data = {id, patient: _patient, day};
    return updateAppointmentService(data, token);
  };

  return {
    patients: patientList.map(p => ({
      label: p.name,
      value: p.id,
      key: p.id,
    })),
    submitForm,
    date: {value: date, handle: handleDate},
    patient: {value: patient, handle: handlePatient},
  };
};
