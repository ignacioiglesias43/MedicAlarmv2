import {Appointment} from '../api/appointments/model/Appointment';

type AppointmentState = {
  appointments: Array<Appointment>;
};

type AppointmentAction = {
  type: string;
  payload: any;
};

type DispatchAppoinmtentActionType = (args: AppointmentAction) => AppointmentAction;
