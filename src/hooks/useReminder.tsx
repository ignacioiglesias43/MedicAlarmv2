import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {useAppDispatch} from '../store/hooks';

const useReminder = () => {
  const {reminders} = useSelector((state: RootState) => state.reminderReducer);
  const [reminderList, setReminderList] = useState(reminders);

  //TODO: Sacar lo relacionado a busqueda a su propio hook
  const [query, setQuery] = useState('');
  const updateQuery = (text:string) => setQuery(text)
  useEffect(() => {
    console.log(query);
    if (query) {
      setReminderList(
        reminders.filter(item => {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          return itemData.indexOf(query.toUpperCase()) > -1;
        }),
      );
    } else {
      setReminderList(reminders);
    }
  }, [query]);

  return {reminderList, updateQuery, query};
};

export default useReminder;
