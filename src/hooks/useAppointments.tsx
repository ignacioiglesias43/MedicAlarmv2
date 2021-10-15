import {useState} from 'react';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: {
        name: 'Dr. Cándido Pérez',
      },
      date: '15/10/2021',
      hour: '14:30',
    },
    {
      id: 2,
      doctor: {
        name: 'Dr. Simi',
      },
      date: '15/10/2021',
      hour: '18:00',
    },
  ]);

  return {appointments};
};
