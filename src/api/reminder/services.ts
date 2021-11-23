import request from '../request';
import {GetRemindersDTO} from './dto/reminder.dto';
import {
  CreateReminderDTO,
  CreateReminderResponseDTO,
} from './dto/create-reminder.dto';
import {Reminder} from './model/Reminder';

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

export const deleteReminderService = (alarm: Reminder, token: string) =>
  request<GetRemindersDTO>({
    method: 'DELETE',
    url: '/alarm/' + alarm,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
