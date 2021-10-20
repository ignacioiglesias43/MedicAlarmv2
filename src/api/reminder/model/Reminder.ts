import { Contact } from "../../contact/model/Contact";

export interface Reminder {
  id: number;
  name: string;
  frecuency: number;
  monitoring: boolean;
  next_hour: string;
  total_shots?: number;
  count: number;
  contact?: Contact
}
