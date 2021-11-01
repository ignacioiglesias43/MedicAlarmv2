import {Patient} from '../../api/patient/model/Patient';
import {User} from '../../api/user/model/User';
import {DispatchPatientActionType} from '../../types/reminder';
import {UPDATE_PATIENTS, ADD_PATIENT} from './actionTypes';

export const updatePatients =
  (patients: Array<Patient>) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: UPDATE_PATIENTS,
      payload: patients,
    });

export const addPatient =
  (patient: User) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: ADD_PATIENT,
      payload: patient,
    });
