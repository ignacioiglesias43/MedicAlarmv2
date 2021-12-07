import { Prescription } from "../../prescriptions/model/Prescription";
import { User } from "../../user/model/User";

export interface Patient {
    id: string,
    user: User,
    prescriptions: Array<Prescription>
}
