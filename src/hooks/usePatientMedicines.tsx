import {useNavigation} from '@react-navigation/core';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Prescription} from '../api/prescriptions/model/Prescription';

export const usePatientMedicines = (code: string) => {
  const {patients} = useSelector((state: RootState) => state.patientReducer);
  const patient = patients.find(e => e.user.code === code);
  
  const navigation = useNavigation();

  return {prescriptions: patient?.prescriptions};
};
