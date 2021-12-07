import {Reminder} from '../api/reminder/model/Reminder';

export const initialReminderForm: Reminder = {
  description: '',
  frecuency: '',
  notify: false,
  days: '',
  next_alarm: '',
  next_hour: '',
};
