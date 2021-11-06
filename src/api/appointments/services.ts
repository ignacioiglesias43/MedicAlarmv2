import request from '../request';
import {CreateAppoinment} from './dto/create-appointment.dto';

export const getAppointmentService = (token: string) =>
  request({
    method: 'GET',
    url: '/appointment',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const addAppointmentService = (data: CreateAppoinment, token: string) =>
  request({
    method: 'POST',
    url: '/appointment',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });
