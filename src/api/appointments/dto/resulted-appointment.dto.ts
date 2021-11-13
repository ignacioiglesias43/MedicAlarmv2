import {Appointment} from '../model/Appointment';

export interface ResultedAppoinmentCreate {
  data: Appointment;
}

export interface ResultedAppointmentGet {
  data: Array<Appointment>;
}
