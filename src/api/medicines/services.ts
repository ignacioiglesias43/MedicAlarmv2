import request from '../request';
import {GetFilterMedicineDTO, GetMedicinesDTO} from './dto/get-medicines.dto';

export const getAllMedicines = (token: string) =>
  request<GetMedicinesDTO>({
    method: 'get',
    url: '/medicament',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getFilterMedicines = (query: string, token: string) =>
  request<GetFilterMedicineDTO>({
    method: 'GET',
    url: `/medicament/${query}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
