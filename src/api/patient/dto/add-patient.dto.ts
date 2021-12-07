import {Prescription} from '../../prescriptions/model/Prescription';
import {User} from '../../user/model/User';

export interface addPatientDto {
  patient: User;
  id: string;
}

export interface newPrescriptionDto {
  id: string;
  prescription: Prescription;
}
