import {PatientState, PatientAction} from '../../types/patient';
import {ADD_PATIENT, UPDATE_PATIENTS} from './actionTypes';

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
          {patient: action.payload, prescriptions: []},
          ...state.patients,
        ],
      };
    default:
      return state;
  }
};

export default patientReducer;
