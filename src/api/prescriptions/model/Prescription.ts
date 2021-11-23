import { Medicine } from "../../medicines/model/Medicines";

export interface Prescription {
  id: number | undefined;
  medicament?: Medicine | undefined
  frecuency: number,
  interval: number,
}
