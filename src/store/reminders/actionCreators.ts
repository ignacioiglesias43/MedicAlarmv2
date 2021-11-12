import {Reminder} from '../../api/reminder/model/Reminder';
import {DispatchReminderActionType} from '../../types/patient';
import {UPDATE_REMINDERS} from './actionTypes';

export const updateReminders =
  (reminder: Reminder[]) => (dispatch: DispatchReminderActionType) =>
    dispatch({
      type: UPDATE_REMINDERS,
      payload: reminder,
    });
