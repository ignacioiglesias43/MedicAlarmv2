import request from '../request';
import {GetMedicinesDTO} from './dto/get-medicines.dto';

export const getAllMedicines = (token: string) =>
  request<GetMedicinesDTO>({
    method: 'get',
    url: '/medicament',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
