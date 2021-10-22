import { Medicine } from "../../medicines/model/Medicines";

export interface Prescription {
  id: number;
  medicine?: Medicine
  frecuency: number,
  count: number,
}
