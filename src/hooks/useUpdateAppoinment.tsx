import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {ResultedAppoinmentCreate} from '../api/appointments/dto/resulted-appointment.dto';
import {Appointment} from '../api/appointments/model/Appointment';
import {addAppointmentService} from '../api/appointments/services';
import {addAppointment} from '../store/appoinment/actionCreators';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {useFormatedDate} from './useDateText';
import {useModal} from './useModal';

export const useUpdateAppoinment = (actionType: 'UPDATE' | 'ADD') => {
  const {patients} = useAppSelector((state: RootState) => state.patientReducer);
  const [date, setDate] = useState(new Date());
  const openModal = useModal();
  const {token} = useSelector((state: RootState) => state.authReducer);
  const [patient, setPatient] = useState(patients[0].patient.code);
  const fDate = useFormatedDate(date.toISOString());
  const patientList = patients.map(a => ({
    name: a.patient.name,
    id: a.patient.code,
  }));

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleDate = (date: Date) => setDate(date);
  const handlePatient = (patient: any) => setPatient(patient);

  const submitForm = async () => {
    const data = {patient: patient!, day: fDate};
    try {
      dispatch(updateIndicatorVisible(true));
      const result = await addAppointmentService(data, token);
      if (result) {
        dispatch(updateIndicatorVisible(false));
        const {data} = result.data as ResultedAppoinmentCreate;
        dispatch(addAppointment(data));
        navigation.goBack();
      }
    } catch (error: any) {
      dispatch(updateIndicatorVisible(false));
      console.log(error);
      if (error.response) {
        dispatch(updateIndicatorVisible(false));
        openModal(error?.response?.data?.message);
      }
    }
  };

  return {
    patients: patientList,
    submitForm,
    date: {value: date, handle: handleDate},
    patient: {value: patient, handle: handlePatient},
  };
};
