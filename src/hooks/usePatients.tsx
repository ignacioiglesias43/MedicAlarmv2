import {useState} from 'react';
import {Patient} from '../api/patient/model/Patient';

export const usePacient = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      patient: {
        id: 1,
        name: 'Ignacio',
        lastname: 'Iglesias',
        phone: '6122192275',
        email: 'iglesias@gmail.com',
      },
      prescriptions: [],
    },
  ]);

  return {patients};
};
