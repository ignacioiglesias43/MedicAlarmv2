import request from '../request';
import {CreatePrescriptionDTO} from './dto/create-prescription.dto';
import {UpdatePrescriptionDTO} from './dto/update-prescription.dto';

export const addPrescriptionToPatient = (
  data: CreatePrescriptionDTO,
  token: string,
) =>
  request({
    method: 'POST',
    url: '/prescription',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });

export const deletePrescriptionPatient = (id: string, token: string) =>
  request({
    method: 'DELETE',
    url: `/prescription/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const updatePrescriptionToPatient = (
  data: UpdatePrescriptionDTO,
  token: string,
) =>
  request({
    method: 'PUT',
    url: '/prescription',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });
