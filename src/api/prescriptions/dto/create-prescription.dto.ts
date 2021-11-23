export interface CreatePrescriptionDTO {
  description?: string;
  medicament: number;
  patient: string;
  interval: number;
  duration: number;
}
