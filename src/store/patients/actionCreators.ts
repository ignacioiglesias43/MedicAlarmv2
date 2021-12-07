import {
  addPatientDto,
  newPrescriptionDto,
} from '../../api/patient/dto/add-patient.dto';
import {Patient} from '../../api/patient/model/Patient';
import {DeletePrescriptionDto} from '../../api/prescriptions/dto/delete-prescription.dto';
import {Prescription} from '../../api/prescriptions/model/Prescription';
import {DispatchPatientActionType} from '../../types/reminder';
import {
  UPDATE_PATIENTS,
  ADD_PATIENT,
  DELETE_PATIENT,
  ADD_PRES_TO_PATIENT,
  DEL_PRES_TO_PATIENT,
  UPT_PRES_TO_PATIENT,
} from './actionTypes';

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

export const addNewPrescriptionToPatient =
  (data: newPrescriptionDto) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: ADD_PRES_TO_PATIENT,
      payload: data,
    });

export const deletePrescritpionOnPatient =
  (data: DeletePrescriptionDto) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: DEL_PRES_TO_PATIENT,
      payload: data,
    });

export const updatePrescriptionPatient =
  (data: newPrescriptionDto) => (dispatch: DispatchPatientActionType) =>
    dispatch({
      type: UPT_PRES_TO_PATIENT,
      payload: data,
    });
