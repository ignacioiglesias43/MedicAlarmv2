import {AxiosResponse} from 'axios';
import {Contact} from '../model/Contact';

export interface GetContactDto extends AxiosResponse<Contact[]> {}
