import {ContactAction, ContactState} from '../../types/contact';
import {UPDATE_CONTACTS, ADD_CONTACT, DELETE_CONTACT} from './actionTypes';

const initialState: ContactState = {
  contacts: [],
};

const authReducer = (
  state = initialState,
  action: ContactAction,
): ContactState => {
  switch (action.type) {
    case UPDATE_CONTACTS:
      return {...state, contacts: action.payload};
    case ADD_CONTACT:
      return {...state, contacts: [action.payload, ...state.contacts]};
    case DELETE_CONTACT:
      return {...state, contacts: state.contacts.filter(item => item.id !== action.payload.id)};
    default:
      return state;
  }
};

export default authReducer;
