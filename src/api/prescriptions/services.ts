import request from '../request';
import {CreatePrescriptionDTO} from './dto/create-prescription.dto';

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
