import {AxiosResponse} from 'axios';
import {Reminder} from '../model/Reminder';

export interface GetRemindersDTO extends AxiosResponse<Reminder[]> {}
