import {useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {useAppDispatch} from '../store/hooks';
import {Contact} from '../api/contact/model/Contact';
import {useQuery} from './useQuery';
import {deleteContactService, getContactService} from '../api/contact/services';
import {deleteContact, updateContacts} from '../store/contacts/actionCreators';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {useModal} from './useModal';
import colors from '../styles/colors';

export const useContacts = () => {
  const {contacts} = useSelector((state: RootState) => state.contactReducer);
  const {token} = useSelector((state: RootState) => state.authReducer);
  const {openModal, isModalVisible, message} = useModal();

  const {filteredList, searchFunction, query} = useQuery<Contact>(contacts);

  const dispatch = useAppDispatch();

  const getContacts = useCallback(async () => {
    try {
      const response = await getContactService(token);

      if (response) {
        const {data} = response.data;
        dispatch(updateContacts(data));
      }
    } catch (error: any) {
      console.log('error: ', {...error});
    }
  }, [dispatch, token]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const deleteContactButton = async (contact: Contact) => {
    openModal(`¿Seguro que desea eliminar a ${contact.name}?`, true);
    /* if (!isModalVisible) {
      try {
        dispatch(updateIndicatorVisible(true));
        const response = await deleteContactService(contact.id!, token);
        if (response) {
          dispatch(deleteContact(contact.id!));
          dispatch(updateIndicatorVisible(false));
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || '';
        openModal(message, false, 'Error', 'alert-decagram', colors.error);
      } finally {
        dispatch(updateIndicatorVisible(false));
      }
    } */
  };

  return {
    contactsList: filteredList,
    searchFunction,
    search: query,
    deleteContactButton,
  };
};
