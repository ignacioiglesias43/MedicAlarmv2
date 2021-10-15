import {useState} from 'react'
import {useSelector} from 'react-redux';
import { RootState } from '../store/index';
import {useAppDispatch} from '../store/hooks';


const useReminder = () => {
    const { reminders } = useSelector((state: RootState) => state.reminderReducer);

    //const [reminders, setReminders] = useState()
    //TODO: Toda la lógica con los reminders

    return {reminders}
}

export default useReminder
