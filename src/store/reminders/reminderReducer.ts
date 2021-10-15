import {ReminderAction, ReminderState} from '../../types/reminder';
import {UPDATE_REMINDERS} from './actionTypes';

const initialState: ReminderState = {
  reminders: [
    {
      id: 1,
      name: 'Keterolaco',
      frecuency: 8,
      monitoring: false,
      next_hour: '10:30',
      total_shots: 5,
      count: 0,
    },
  ],
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
