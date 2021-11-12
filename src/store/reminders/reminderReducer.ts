import {ReminderAction, ReminderState} from '../../types/reminder';
import {UPDATE_REMINDERS} from './actionTypes';

const initialState: ReminderState = {
  reminders: [],
};

const reminderReducer = (
  state = initialState,
  action: ReminderAction,
): ReminderState => {
  switch (action.type) {
    case UPDATE_REMINDERS:
      const newReminders = state.reminders.concat(action.payload);
      return {...state, reminders: newReminders};
    default:
      return state;
  }
};

export default reminderReducer;
