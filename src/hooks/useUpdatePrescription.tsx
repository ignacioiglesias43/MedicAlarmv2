import React from 'react';
import {Prescription} from '../api/prescriptions/model/Prescription';
import {useForm} from './useForm';

const useUpdatePrescription = (actionType: 'ADD' | 'UPDATE') => {
  const {formFields, createChangeHandler} = useForm<Prescription, Prescription>(
    {
      id: actionType === 'ADD' ? undefined : 1,
      count: actionType === 'ADD' ? 0 : 8,
      frecuency: actionType === 'ADD' ? 0 : 8,
      medicine:
        actionType === 'ADD'
          ? undefined
          : {
              id: 1,
              name: 'Keterolaco',
              via_admin: 'Oral',
            },
    },
  );

  return {
    formFields,
    setValues: createChangeHandler,
  };
};

export default useUpdatePrescription;
