import request from '../request';
import {CreateAppoinment} from './dto/create-appointment.dto';

export const addAppointmentService = (data: CreateAppoinment, token: string) =>
  request({
    method: 'POST',
    url: '/appointment',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });
