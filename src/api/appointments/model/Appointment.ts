import {User} from '../../user/model/User';

export interface Appointment {
  id: number;
  patient_id: number,
  medic_id: number;
  medic?: User,
  patient?: User,
  day: string;
}
