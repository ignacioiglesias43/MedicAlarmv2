import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';

export const useUpdateAppoinment = (actionType: 'UPDATE' | 'ADD') => {
  const {patients} = useAppSelector((state: RootState) => state.patientReducer);
  const [date, setDate] = useState(new Date());
  const patientList = patients.map(a => a.patient);

  const handleDate = (date: Date) => setDate(date);

  const submitForm = () => {};

  return {
    patients: patientList,
    submitForm,
    date: {value: date, handle: handleDate},
  };
};
