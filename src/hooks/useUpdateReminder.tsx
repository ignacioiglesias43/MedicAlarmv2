import {useForm} from './useForm';
import {Reminder} from '../api/reminder/model/Reminder';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';
import {useState, useEffect} from 'react';
import {useModal} from './useModal';
import {initialReminderForm} from '../constants/addReminderForm';
import {
  createReminderService,
  updateReminderService,
} from '../api/reminder/services';
import {
  CreateReminderDTO,
  UpdateReminderDTO,
} from '../api/reminder/dto/create-reminder.dto';
import {RouteProp} from '@react-navigation/core';
import {ReminderStackParams} from '../navigation/stacks/ReminderStack';
import moment from 'moment';
import {updateReminders} from '../store/reminders/actionCreators';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  updateSnackBarMessage,
  updateSnackBarVisible,
} from '../store/snackbar/actionCreators';
import {useNotification} from '../hooks/useNotification';

export const useUpdateReminder = (
  actionType: 'UPDATE' | 'ADD',
  route: RouteProp<ReminderStackParams, 'Update'>,
  navigation: NativeStackNavigationProp<ReminderStackParams, 'Update'>,
) => {
  const {token} = useAppSelector((state: RootState) => state.authReducer);
  const {reminders} = useAppSelector(
    (state: RootState) => state.reminderReducer,
  );
  const {contacts} = useAppSelector((state: RootState) => state.contactReducer);
  const {openModal} = useModal();
  const {reminder} = route.params;
  const {createChangeHandler, formFields} = useForm<Reminder>(
    actionType === 'ADD' ? initialReminderForm : reminder!,
  );
  const {onCreateTriggerNotification} = useNotification();

  const [isMonitoring, setIsMonitoring] = useState(formFields.notify);
  const [date, setDate] = useState(
    actionType === 'UPDATE'
      ? new Date(Date.parse(formFields.next_alarm))
      : moment(Date.now()).add(2, 'm').toDate(),
  );

  const dispatch = useAppDispatch();

  const handleDate = (newD: Date) => setDate(newD);

  const updateMonitoring = () => {
    if ((!isMonitoring && contacts.length > 0) || isMonitoring) {
      setIsMonitoring(!isMonitoring);
    } else {
      openModal('Agregue un contacto de confianza primero.');
    }
  };

  const saveReminder = async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      const reminderData: CreateReminderDTO = {
        days: formFields.days,
        frecuency: formFields.frecuency,
        description: formFields.description!,
        next_alarm: moment(date).format(),
        notify: isMonitoring,
      };

      if (formFields.contact) {
        reminderData.contact_id = formFields.contact.id;
      }

      const response = await createReminderService(reminderData, token);
      dispatch(updateReminders(reminders.concat(response.data.data)));
      onCreateTriggerNotification(response.data.data);
      navigation.goBack();
      dispatch(updateSnackBarMessage(response.data.message));
      dispatch(updateSnackBarVisible(true));
    } catch (error: any) {
      // TODO mostrar error
      console.log('error', error);
      console.log(error.response);
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };

  const updateReminder = async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      const reminderData: UpdateReminderDTO = {
        id: formFields.id!,
        days: formFields.days,
        frecuency: formFields.frecuency,
        description: formFields.description!,
        next_alarm: moment(date).format('Y-M-D H:m'),
        notify: isMonitoring,
      };

      if (formFields.contact) {
        reminderData.contact_id = formFields.contact.id;
      }

      const response = await updateReminderService(reminderData, token);
      const indexUp = reminders.findIndex(rem => rem.id === formFields.id!);
      const rems = [...reminders];
      rems[indexUp] = response.data.data;
      onCreateTriggerNotification(response.data.data);
      dispatch(updateReminders(rems));
      navigation.goBack();
      dispatch(updateSnackBarMessage(response.data.message));
      dispatch(updateSnackBarVisible(true));
      console.log(response);
    } catch (error: any) {
      console.log('error', error);
      console.log(error.response);
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };

  const handleAction = () => {
    if (!formFields.description) {
      return;
    }
    if (!formFields.days || formFields.days <= 0) {
      return;
    }

    if (!formFields.frecuency || formFields.frecuency <= 0) {
      return;
    }

    if (isMonitoring && !formFields.contact) {
      return;
    }

    return actionType === 'ADD' ? saveReminder() : updateReminder();
  };

  useEffect(() => {
    createChangeHandler('notify')(isMonitoring);
  }, [isMonitoring]);

  return {
    setValues: createChangeHandler,
    contacts: contacts.map(contact => ({
      label: contact.name,
      value: contact,
      key: contact.id,
    })),
    monitoring: {
      status: isMonitoring,
      handle: updateMonitoring,
    },
    saveReminder: handleAction,
    date: {value: date, handle: handleDate},
    formFields,
  };
};
