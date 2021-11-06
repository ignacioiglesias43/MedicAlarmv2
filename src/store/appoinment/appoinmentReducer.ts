import {AppointmentAction, AppointmentState} from '../../types/appointment';
import {
  ADD_APPOINMENT,
  DELETE_APPOINMENT,
  UPDATE_APPOINMENT,
  UPDATE_APPOINMENTS,
} from './actionTypes';

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentReducer = (
  state = initialState,
  action: AppointmentAction,
): AppointmentState => {
  switch (action.type) {
    case UPDATE_APPOINMENTS:
      return {...state, appointments: action.payload};
    case ADD_APPOINMENT:
      return {...state, appointments: [action.payload, ...state.appointments]};
    case DELETE_APPOINMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          item => item.id !== action.payload,
        ),
      };
    case UPDATE_APPOINMENT:
      const index = state.appointments.findIndex(
        appointment => appointment.id === action.payload.id,
      );
      return {
        ...state,
        appointments: [
          ...state.appointments.slice(0, index),
          {
            ...state.appointments[index],
            ...action.payload,
          },
          ...state.appointments.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};

export default appointmentReducer;
