import {useState} from 'react'

interface ReminderData {
    name: string, 
    nextHour: string,
    frecuency: number,
    times: number,
}

const useReminder = () => {
    const [reminders, setReminders] = useState()


    return {}
}

export default useReminder
