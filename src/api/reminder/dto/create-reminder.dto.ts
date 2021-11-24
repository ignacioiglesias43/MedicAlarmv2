import {AxiosResponse} from 'axios';
import {Reminder} from '../model/Reminder';
export interface CreateReminderDTO {
  days: number;
  next_alarm: string;
  description: string;
  frecuency: number;
  contact_id?: number;
  notify: boolean;
}

export interface UpdateReminderDTO {
  id: number;
  days: number;
  next_alarm: string;
  description: string;
  frecuency: number;
  contact_id?: number;
  notify: boolean;
}

export interface CreateReminderResponseDTO extends AxiosResponse<Reminder> {
  message: string;
}

export interface DeleteRemindersDTO {
  message: string;
}
