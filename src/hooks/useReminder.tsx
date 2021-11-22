import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Reminder} from '../api/reminder/model/Reminder';
import {useQuery} from './useQuery';

import {useAppDispatch} from '../store/hooks';
import {getRemindersService} from '../api/reminder/services';
import {updateReminders} from '../store/reminders/actionCreators';
import pusher from '../api/pusher';
import {useNotification} from './useNotification';

const useReminder = () => {
  const {token, userInfo} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const {onDisplayNotification} = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const {reminders} = useSelector((state: RootState) => state.reminderReducer);
  const {filteredList, searchFunction, query} = useQuery<Reminder>(reminders);

  const dispatch = useAppDispatch();

  const getReminders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getRemindersService(token);

      dispatch(updateReminders([...response.data.data]));
    } catch (error: any) {
      console.log({...error});
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, token]);

  useEffect(() => {
    try {
      var channel = pusher(token).subscribe(`private-Patient.${userInfo?.id}`);
      channel.bind('patient', (data: any) => {
        onDisplayNotification('patient', data.message);
      });
    } catch (error: any) {
      console.log(error);
    }
  }, [onDisplayNotification, token, userInfo?.id]);

  useEffect(() => {
    getReminders();
  }, [getReminders]);

  return {
    query,
    isLoading,
    reminderList: filteredList,
    updateQuery: searchFunction,
    handleReload: getReminders,
  };
};

export default useReminder;
