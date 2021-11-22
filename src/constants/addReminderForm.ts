import {Reminder} from '../api/reminder/model/Reminder';

export const initialReminderForm: Reminder = {
  name: '',
  frecuency: 0,
  monitoring: false,
  next_hour: '',
  count: 0,
};
