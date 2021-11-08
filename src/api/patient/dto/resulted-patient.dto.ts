import {Prescription} from '../../prescriptions/model/Prescription';
import {User} from '../../user/model/User';
import {Patient} from '../model/Patient';

export interface resultedAddPatientDto {
  data: {
    alias: string;
    id: string;
  };
}

export interface resultedGetPattientDto {
  data: Array<Patient>;
}
