export interface CreateReminderDTO {
  days: number;
  next_alarm: string;
  description: string;
  frecuency: number;
  contact_id?: number;
  notify: boolean;
}
