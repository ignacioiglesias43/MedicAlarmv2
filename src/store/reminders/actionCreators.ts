import {Reminder} from '../../api/reminder/model/Reminder';
import {DispatchReminderActionType} from '../../types/patient';
import {
  UPDATE_REMINDERS,
  DELETE_REMINDERS,
  UPDATE_REMINDER,
} from './actionTypes';

export const updateReminders =
  (reminder: Reminder[]) => (dispatch: DispatchReminderActionType) =>
    dispatch({
      type: UPDATE_REMINDERS,
      payload: reminder,
    });

export const deleteReminder =
  (id: number) => (dispatch: DispatchReminderActionType) =>
    dispatch({
      type: DELETE_REMINDERS,
      payload: id,
    });

export const updateSingleReminder =
  (reminder: Reminder) => (dispatch: DispatchReminderActionType) =>
    dispatch({
      type: UPDATE_REMINDER,
      payload: reminder,
    });
