import {ReminderAction, ReminderState} from '../../types/reminder';
import {
  UPDATE_REMINDERS,
  DELETE_REMINDERS,
  UPDATE_REMINDER,
} from './actionTypes';

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
    case UPDATE_REMINDER:
      const index = state.reminders.findIndex(
        rem => rem.id === action.payload.id,
      );
      return {
        ...state,
        reminders: [
          ...state.reminders.slice(0, index),
          {
            ...state.reminders[index],
            ...action.payload,
          },
          ...state.reminders.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};

export default reminderReducer;
