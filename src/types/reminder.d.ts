import {Reminder} from '../api/reminder/model/Reminder';

type ReminderState = {
  reminders: Array<Reminder>;
};

type ReminderAction = {
  type: string;
  payload: any;
};

type DispatchReminderActionType = (args: ReminderAction) => ReminderAction;
