import request from '../request';
import {CreateContactDto} from './dto/create-contact.dto';
import {UpdateContactDto} from './dto/update-contact.dto';
import {GetContactDto} from './dto/get-contact.dto';

export const getContactService = (token: string) =>
  request<GetContactDto>({
    method: 'GET',
    url: '/contact',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const addContactService = (data: CreateContactDto, token: string) =>
  request({
    method: 'POST',
    url: '/contact',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });

export const deleteContactService = (id: number, token: string) =>
  request({
    method: 'DELETE',
    url: `/contact/${id}`,
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
