import {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Reminder} from '../api/reminder/model/Reminder';
import {useQuery} from './useQuery';

import {useAppDispatch} from '../store/hooks';
import {getRemindersService} from '../api/reminder/services';
import {updateReminders} from '../store/reminders/actionCreators';
import pusher from '../api/pusher';
import {Alert} from 'react-native';

const useReminder = () => {
  const {token, userInfo} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const {reminders} = useSelector((state: RootState) => state.reminderReducer);
  const {filteredList, searchFunction, query} = useQuery<Reminder>(reminders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      var channel = pusher(token).subscribe(`private-Patient.${userInfo?.id}`);
      channel.bind('patient', (data: any) => {
        Alert.alert(data.message);
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const getReminders = async () => {
      try {
        const response = await getRemindersService(token);

        dispatch(updateReminders([...response.data.data]));
      } catch (error: any) {
        console.log({...error});
      }
    };

    getReminders();
  }, [dispatch, token]);

  return {reminderList: filteredList, updateQuery: searchFunction, query};
};

export default useReminder;
