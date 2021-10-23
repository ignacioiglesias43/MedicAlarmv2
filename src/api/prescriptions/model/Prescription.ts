import { Medicine } from "../../medicines/model/Medicines";

export interface Prescription {
  id: number | undefined;
  medicine?: Medicine | undefined
  frecuency: number,
  count: number,
}
