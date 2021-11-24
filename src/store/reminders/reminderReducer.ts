import {ReminderAction, ReminderState} from '../../types/reminder';
import {UPDATE_REMINDERS, DELETE_REMINDERS} from './actionTypes';

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
    case DELETE_REMINDERS:
      return {
        ...state,
        reminders: state.reminders.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reminderReducer;
