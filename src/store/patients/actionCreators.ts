import {addPatientDto} from '../../api/patient/dto/add-patient.dto';
import {Patient} from '../../api/patient/model/Patient';
import {DispatchPatientActionType} from '../../types/reminder';
import {UPDATE_PATIENTS, ADD_PATIENT, DELETE_PATIENT} from './actionTypes';

export const updatePatients =
  (patients: Array<Patient>) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: UPDATE_PATIENTS,
      payload: patients,
    });

export const addPatient =
  (data: addPatientDto) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: ADD_PATIENT,
      payload: data,
    });

export const deletePatient =
  (id: string) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: DELETE_PATIENT,
      payload: id,
    });
