import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Patient} from '../api/patient/model/Patient';

export const usePatient = () => {
  const {patients} = useSelector((state: RootState) => state.patientReducer);
  const [patientsList, setPatientsList] = useState<Patient[]>(patients);

  return {patients};
};
