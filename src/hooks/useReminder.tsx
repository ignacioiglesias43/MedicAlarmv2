import {useEffect, useState, useCallback} from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Reminder} from '../api/reminder/model/Reminder';
import {useQuery} from './useQuery';

import {useAppDispatch} from '../store/hooks';
import {getRemindersService} from '../api/reminder/services';
import {updateReminders} from '../store/reminders/actionCreators';

const useReminder = () => {
  const {token} = useSelector((state: RootState) => state.authReducer);
  const {reminders} = useSelector((state: RootState) => state.reminderReducer);
  const {filteredList, searchFunction, query} = useQuery<Reminder>(reminders);
  const [isLoading, setIsLoading] = useState(false);

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
    getReminders();
  }, [getReminders]);

  return {
    reminderList: filteredList,
    updateQuery: searchFunction,
    handleReload: getReminders,
    query,
    isLoading,
  };
};

export default useReminder;
