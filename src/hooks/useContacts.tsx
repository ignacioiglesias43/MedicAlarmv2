import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {useAppDispatch} from '../store/hooks';
import {Contact} from '../api/contact/model/Contact';
import {useQuery} from './useQuery';
import {deleteContactService} from '../api/contact/services';
import {deleteContact} from '../store/contacts/actionCreators';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {
  updateModalIcon,
  updateModalIconColor,
  updateModalMessage,
  updateModalTitle,
} from '../store/modal/actionCreators';
import colors from '../styles/colors';

export const useContacts = () => {
  const {contacts} = useSelector((state: RootState) => state.contactReducer);
  const {token} = useSelector((state: RootState) => state.authReducer);

  const {filteredList, searchFunction, query} = useQuery<Contact>(contacts);

  const dispatch = useAppDispatch();

  const deleteContactButton = async (contact: Contact) => {
    //TODO Modal de confirmación
    dispatch(updateIndicatorVisible(true));
    try {
      const res = await deleteContactService(contact.id, token);
      if (res) {
        dispatch(deleteContact(contact.id));
        dispatch(updateIndicatorVisible(false));
      }
    } catch (error: any) {
      dispatch(updateIndicatorVisible(false));
      dispatch(updateModalTitle('Error'));
      dispatch(updateModalMessage(error?.response?.data?.message || ''));
      dispatch(updateModalIcon('alert-decagram'));
      dispatch(updateModalIconColor(colors.error));
    }
  };

  return {
    contactsList: filteredList,
    searchFunction,
    search: query,
    deleteContactButton,
  };
};
