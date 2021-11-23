import {PatientState, PatientAction} from '../../types/patient';
import {
  ADD_PATIENT,
  DELETE_PATIENT,
  UPDATE_PATIENTS,
  ADD_PRES_TO_PATIENT,
} from './actionTypes';

const initialState: PatientState = {
  patients: [],
};

const patientReducer = (
  state = initialState,
  action: PatientAction,
): PatientState => {
  switch (action.type) {
    case UPDATE_PATIENTS:
      return {...state, patients: action.payload};
    case ADD_PATIENT:
      return {
        ...state,
        patients: [
          {
            user: action.payload.patient,
            id: action.payload.id,
            prescriptions: [],
          },
          ...state.patients,
        ],
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(item => item.id !== action.payload),
      };
    case ADD_PRES_TO_PATIENT:
      return {
        ...state,
        patients: state.patients.map(item => {
          if (item.user.code === action.payload.id) return {
            ...item,
            prescriptions:[
              ...item.prescriptions,
              action.payload.prescription
            ]
          };
          else return item;
        }),
      };
    default:
      return state;
  }
};

export default patientReducer;
