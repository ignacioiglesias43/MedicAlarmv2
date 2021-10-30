import { Patient } from '../api/patient/model/Patient';

type PatientState = {
  patients: Array<Patient>;
};

type PatientAction = {
  type: string;
  payload: any;
};

type DispatchReminderActionType = (args: PatientAction) => PatientAction;
