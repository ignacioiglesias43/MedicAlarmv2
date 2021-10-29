import {Reminder} from '../api/reminder/model/Reminder';

export const initialReminderForm: Reminder = {
  name: '',
  frecuency: '',
  monitoring: false,
  next_hour: '',
  count: '',
};
