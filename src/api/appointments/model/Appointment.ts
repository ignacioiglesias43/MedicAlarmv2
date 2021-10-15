import {User} from '../../user/model/User';

export interface Appointment {
  id: number;
  doctor: User;
  date: string;
  hour: string;
}
