import {useForm} from './useForm';
import {Reminder} from '../api/reminder/model/Reminder';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';
import {useState, useEffect} from 'react';
import {useModal} from './useModal';
import {initialReminderForm} from '../constants/addReminderForm';
import {createReminderService} from '../api/reminder/services';
import {CreateReminderDTO} from '../api/reminder/dto/create-reminder.dto';
import {RouteProp} from '@react-navigation/core';
import {ReminderStackParams} from '../navigation/stacks/ReminderStack';
import moment from 'moment';
import {updateReminders} from '../store/reminders/actionCreators';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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

  const [isMonitoring, setIsMonitoring] = useState(formFields.notify);
  const [date, setDate] = useState(
    actionType === 'UPDATE'
      ? new Date(Date.parse(formFields.next_alarm))
      : new Date(),
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
      navigation.goBack();
      // TODO mostrar snackbar con response.data.message
    } catch (error) {
      // TODO mostrar error
      console.log('error', error);
      console.log(error.response);
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };

  const updateReminder = async () => {
    try {
      console.log('update');
    } catch (error) {
      console.log(error);
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
