import request from '../request';
import {GetRemindersDTO} from './dto/reminder.dto';
import {
  CreateReminderDTO,
  UpdateReminderDTO,
  CreateReminderResponseDTO,
  DeleteRemindersDTO,
} from './dto/create-reminder.dto';
import {postponeReminderResultDTO} from './dto/resulter-reminder.dto';

export const getRemindersService = (token: string) =>
  request<GetRemindersDTO>({
    method: 'GET',
    url: '/alarm',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const createReminderService = (data: CreateReminderDTO, token: string) =>
  request<CreateReminderResponseDTO>({
    method: 'POST',
    url: '/alarm',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });

export const updateReminderService = (data: UpdateReminderDTO, token: string) =>
  request<CreateReminderResponseDTO>({
    method: 'PUT',
    url: '/alarm',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });

export const deleteReminderService = (id: number, token: string) =>
  request<DeleteRemindersDTO>({
    method: 'DELETE',
    url: '/alarm/' + id,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const postponeReminderService = (id: string, token: string) =>
  request<CreateReminderResponseDTO>({
    method: 'GET',
    url: `alarm/off/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
