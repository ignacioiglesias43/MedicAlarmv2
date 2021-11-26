export interface UpdatePrescriptionDTO {
  id: string;
  description?: string;
  medicament_id?: string;
  patient?: string;
  interval?: string;
  duration?: string;
}
