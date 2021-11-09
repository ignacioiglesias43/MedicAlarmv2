import React from 'react';
import {Prescription} from '../api/prescriptions/model/Prescription';
import { initialPrescriptionForm } from '../constants/prescriptionForm';
import {useForm} from './useForm';

const useUpdatePrescription = (actionType: 'ADD' | 'UPDATE') => {
  const {formFields, createChangeHandler} = useForm<Prescription, Prescription>(
    actionType === 'ADD' ? initialPrescriptionForm : initialPrescriptionForm
  );

  return {
    formFields,
    setValues: createChangeHandler,
  };
};

export default useUpdatePrescription;
