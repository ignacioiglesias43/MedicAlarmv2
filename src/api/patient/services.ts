import request from '../request';

export const addPatientToDoctor = (code: string, token: string) =>
  request({
    method: 'POST',
    url: '/patient',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: {
      patient: code,
      alias: '',
    },
  });

export const getPatientsService = (token: string) =>
  request({
    method: 'GET',
    url: '/patient',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
