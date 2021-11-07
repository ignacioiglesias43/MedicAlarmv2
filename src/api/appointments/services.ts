import request from '../request';
import {CreateAppoinment} from './dto/create-appointment.dto';
import {UpdateAppoinment} from './dto/update-appointment.dto';

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

export const updateAppointmentService = (
  data: UpdateAppoinment,
  token: string,
) =>
  request({
    method: 'PUT',
    url: '/appointment',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });

export const deleteAppointmentService = (id: number, token: string) =>
  request({
    method: 'DELETE',
    url: `/appointment/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
