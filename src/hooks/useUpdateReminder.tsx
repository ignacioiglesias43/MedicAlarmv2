import {useForm} from './useForm';
import {Reminder} from '../api/reminder/model/Reminder';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';
import {useState, useEffect} from 'react';
import {useModal} from './useModal';
import {initialReminderForm} from '../constants/addReminderForm';
import {createReminderService} from '../api/reminder/services';
import {CreateReminderDTO} from '../api/reminder/dto/create-reminder.dto';

export const useUpdateReminder = (actionType: 'UPDATE' | 'ADD') => {
  const {token} = useAppSelector((state: RootState) => state.authReducer);
  const {contacts} = useAppSelector((state: RootState) => state.contactReducer);
  const {openModal} = useModal();
  const {createChangeHandler, formFields} = useForm<Reminder>(
    actionType === 'ADD' ? initialReminderForm : initialReminderForm,
  );

  const [isMonitoring, setIsMonitoring] = useState(formFields.monitoring);

  const dispatch = useAppDispatch();

  const updateMonitoring = () => {
    if ((!isMonitoring && contacts.length > 0) || isMonitoring) {
      setIsMonitoring(!isMonitoring);
    } else {
      openModal('Agregue un contacto de confianza primero.');
    }
  };

  const saveReminder = async () => {
    try {
      const reminderData: CreateReminderDTO = {
        days: formFields.count,
        frecuency: formFields.frecuency,
        description: formFields.name,
        next_alarm: formFields.next_hour,
        notify: formFields.monitoring,
      };

      if (formFields.contact) {
        reminderData.contact_id = formFields.contact.id;
      }
      const response = await createReminderService(reminderData, token);

      console.log(response);

      // TODO validar este response
    } catch (error) {
      console.log(error);
    }
  };

  const updateReminder = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createChangeHandler('monitoring')(isMonitoring);
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
    saveReminder: actionType === 'ADD' ? saveReminder : updateReminder,
    formFields,
  };
};
