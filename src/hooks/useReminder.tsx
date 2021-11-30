import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Reminder} from '../api/reminder/model/Reminder';
import {useQuery} from './useQuery';

import {useAppDispatch} from '../store/hooks';
import {
  getRemindersService,
  deleteReminderService,
} from '../api/reminder/services';
import {
  updateReminders,
  deleteReminder,
} from '../store/reminders/actionCreators';
import {useModal} from './useModal';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {updateModalUserHasConfirmed} from '../store/modal/actionCreators';
import {
  updateSnackBarMessage,
  updateSnackBarVisible,
} from '../store/snackbar/actionCreators';

import notifee from '@notifee/react-native';

const useReminder = () => {
  const {token} = useSelector((state: RootState) => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [reminderSelected, setReminderSelected] = useState<Reminder>();
  const {reminders} = useSelector((state: RootState) => state.reminderReducer);
  const {filteredList, searchFunction, query} = useQuery<Reminder>(reminders);

  const dispatch = useAppDispatch();
  const {openModal, userHasConfirmed} = useModal();

  useEffect(() => {
    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));
  }, []);

  const getReminders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getRemindersService(token);

      dispatch(updateReminders(response.data.data));
    } catch (error: any) {
      console.log({...error});
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, token]);

  const removeReminder = useCallback(async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      dispatch(updateModalUserHasConfirmed(false));
      const response = await deleteReminderService(
        reminderSelected?.id!,
        token,
      );
      dispatch(deleteReminder(reminderSelected?.id!));
      dispatch(updateSnackBarMessage(response.data.message));
      dispatch(updateSnackBarVisible(true));
    } catch (error: any) {
      console.log({...error});
    } finally {
      dispatch(updateIndicatorVisible(false));
      setReminderSelected(undefined);
    }
  }, [dispatch, reminderSelected?.id, token]);

  const deleteButton = (reminder: Reminder) => {
    setReminderSelected(reminder);
    openModal(
      `¿Seguro que desea eliminar la alarma ${reminder.description!}?`,
      true,
    );
  };

  useEffect(() => {
    getReminders();
  }, [getReminders]);

  useEffect(() => {
    if (userHasConfirmed) {
      removeReminder();
    }
  }, [removeReminder, userHasConfirmed]);

  return {
    query,
    isLoading,
    reminderList: filteredList,
    updateQuery: searchFunction,
    handleReload: getReminders,
    deleteReminder: deleteButton,
  };
};

export default useReminder;
