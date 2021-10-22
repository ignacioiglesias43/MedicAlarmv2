import {useState} from 'react';
import { Prescription } from '../api/prescriptions/model/Prescription';

export const usePatientMedicines = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      medicine: {
          id: 1,
          name: 'Keterolaco',
          via_admin: 'Oral'
      },
      frecuency: 8,
      count: 8
    },
  ]);

  return {prescriptions};
};
