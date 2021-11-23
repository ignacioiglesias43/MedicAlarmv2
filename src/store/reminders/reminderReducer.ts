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
      return {...state, reminders: action.payload};
    default:
      return state;
  }
};

export default reminderReducer;
