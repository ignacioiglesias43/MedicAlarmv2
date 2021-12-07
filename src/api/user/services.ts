import request from '../request';
import { UpdateUserTdo } from './dto/update-user.dto';

export const getUserByCode = (code: string, token: string) =>
  request({
    method: 'GET',
    url: `/user/${code}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });


export const updateUserInfoService = (data: UpdateUserTdo, token: string) => request({
  method: 'PUT',
  url: "/user",
  headers: {
    Authorization: 'Bearer ' + token,
  },
  data
})
