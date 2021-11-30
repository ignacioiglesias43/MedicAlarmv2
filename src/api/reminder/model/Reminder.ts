import {Contact} from '../../contact/model/Contact';

export interface Reminder {
  id?: number;
  description?: string;
  frecuency: number;
  notify: boolean;
  next_hour: string;
  next_alarm: string;
  total_shots?: number;
  days: number;
  end_date?: string;
  contact?: Contact;
}
