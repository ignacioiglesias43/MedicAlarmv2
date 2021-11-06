import {useForm} from './useForm';
import {Reminder} from '../api/reminder/model/Reminder';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';
import {useState} from 'react';
import {useModal} from './useModal';
import {initialReminderForm} from '../constants/addReminderForm';

export const useUpdateReminder = (actionType: 'UPDATE' | 'ADD') => {
  const {contacts} = useAppSelector((state: RootState) => state.contactReducer);
  const {openModal} = useModal();
  const {createChangeHandler, formFields} = useForm<Reminder, Reminder>(
    actionType === 'ADD' ? initialReminderForm : initialReminderForm,
  );

  const [isMonitoring, setIsMonitoring] = useState(formFields.monitoring);

  const dispatch = useAppDispatch();

  const updateMonitoring = () => {
    if ((!isMonitoring && contacts.length > 0) || isMonitoring)
      setIsMonitoring(!isMonitoring);
    else openModal('Agregue un contacto de confianza primero.');
  };

  return {
    formFields,
    setValues: createChangeHandler,
    contacts,
    monitoring: {
      status: isMonitoring,
      handle: updateMonitoring,
    },
  };
};
