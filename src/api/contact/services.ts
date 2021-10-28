import request from '../request';
import {CreateContactDto} from './dto/create-contact.dto';
import {DeleteContactDto} from './dto/delete-cotact.dto';
import {UpdateContactDto} from './dto/update-contact.dto';

export const addContactService = (data: CreateContactDto, token: string) =>
  request({
    method: 'POST',
    url: '/contact',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });

export const deleteContactService = (data: DeleteContactDto, token: string) =>
  request({
    method: 'DELETE',
    url: `/contact/${data}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const updateContactService = (data: UpdateContactDto, token: string) =>
  request({
    method: 'PUT',
    url: '/contact',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });
