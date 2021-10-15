import {useState} from 'react';
import {Appointment} from '../api/appointments/model/Appointment';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctor: {
        name: 'Dr. Cándido Pérez',
        email: '',
        lastName: '',
      },
      date: '15/10/2021',
      hour: '14:30',
    },
    {
      id: 2,
      doctor: {
        name: 'Dr. Simi',
        email: '',
        lastName: '',
      },
      date: '15/10/2021',
      hour: '18:00',
    },
  ]);

  return {appointments};
};
