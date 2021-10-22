import {useState} from 'react';
import { User } from '../api/user/model/User';

export const usePacient = () => {
  const [patients, setPatients] = useState<User[]>([
    {
      id: 1,
      name: 'Ignacio',
      lastname: 'Iglesias',
      phone: '6122192275',
      email: 'iglesias@gmail.com'
    },
  ]);

  return {patients};
};
