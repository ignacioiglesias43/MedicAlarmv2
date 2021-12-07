import {
  UPDATE_APPOINMENTS,
  UPDATE_APPOINMENT,
  DELETE_APPOINMENT,
  ADD_APPOINMENT,
} from './actionTypes';
import {Appointment} from '../../api/appointments/model/Appointment';
import {DispatchAppoinmtentActionType} from '../../types/appointment';

export const updateAppointmets =
  (appointments: Array<Appointment>) =>
  (dispatch: DispatchAppoinmtentActionType) =>
    dispatch({
      type: UPDATE_APPOINMENTS,
      payload: appointments,
    });

export const addAppointment =
  (appointment: Appointment) => (dispatch: DispatchAppoinmtentActionType) =>
    dispatch({
      type: ADD_APPOINMENT,
      payload: appointment,
    });

export const deleteAppointment =
  (id: number) => (dispatch: DispatchAppoinmtentActionType) =>
    dispatch({
      type: DELETE_APPOINMENT,
      payload: id,
    });

export const updateSingleAppointment =
  (appointment: Appointment) => (dispatch: DispatchAppoinmtentActionType) =>
    dispatch({
      type: UPDATE_APPOINMENT,
      payload: appointment,
    });
