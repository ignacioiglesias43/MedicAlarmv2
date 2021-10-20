import { useForm } from "./useForm";
import { Reminder } from "../api/reminder/model/Reminder";

export const useUpdateReminder = (actionType: 'UPDATE' | 'ADD') => {
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
    }
}