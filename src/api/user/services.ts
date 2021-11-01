import request from '../request';

export const getUserByCode = (code: string, token: string) =>
  request({
    method: 'GET',
    url: `/user/${code}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
