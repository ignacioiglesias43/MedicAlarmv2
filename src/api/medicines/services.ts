import request from '../request';

export const getAllMedicines = (token: string) =>
  request({
    method: 'get',
    url: '/medicament',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
