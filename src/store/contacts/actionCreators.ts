import {DispatchContactActionType} from '../../types/contact';
import {ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACTS} from './actionTypes';
import {Contact} from '../../api/contact/model/Contact';

export const updateContact =
  (contact: Contact) => (dispatch: DispatchContactActionType) =>
    dispatch({
      type: UPDATE_CONTACTS,
      payload: contact,
    });

export const addContact =
  (contact: Contact) => (dispatch: DispatchContactActionType) =>
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });

export const deleteContact =
  (contact: Contact) => (dispatch: DispatchContactActionType) =>
    dispatch({
      type: DELETE_CONTACT,
      payload: contact,
    });
