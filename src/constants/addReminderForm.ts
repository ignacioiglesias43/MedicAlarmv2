import {Reminder} from '../api/reminder/model/Reminder';

export const initialReminderForm: Reminder = {
  description: '',
  frecuency: 0,
  notify: false,
  days: 0,
  next_alarm: '',
  next_hour: '',
};
