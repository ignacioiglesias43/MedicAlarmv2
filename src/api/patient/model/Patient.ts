import { Prescription } from "../../prescriptions/model/Prescription";
import { User } from "../../user/model/User";

export interface Patient {
    patient: User,
    prescriptions: Array<Prescription>
}