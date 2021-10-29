import { useForm } from "./useForm";
import { Reminder } from "../api/reminder/model/Reminder";
import {useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';

export const useUpdateReminder = (actionType: 'UPDATE' | 'ADD') => {
  const {contacts} = useAppSelector((state: RootState) => state.contactReducer);

    const {createChangeHandler, formFields} = useForm<Reminder, Reminder>({
        id: actionType === 'UPDATE' ? 0 : 0,
        name: actionType === 'UPDATE' ? 'Keterolaco' : '',
        frecuency: actionType === 'UPDATE' ? 8 : 0,
        monitoring: actionType === 'UPDATE' ? false : false,
        count: actionType === 'UPDATE' ? 3 : 0,
        next_hour: actionType === 'UPDATE' ? '' : ''
    })

    return {
        formFields,
        setValues: createChangeHandler,
        contacts,
    }
}