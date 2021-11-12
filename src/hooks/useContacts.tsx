import {useEffect, useCallback, useState} from 'react';
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
import {updateModalUserHasConfirmed} from '../store/modal/actionCreators';

export const useContacts = () => {
  const {contacts} = useSelector((state: RootState) => state.contactReducer);
  const {token} = useSelector((state: RootState) => state.authReducer);

  const [userSelected, setUserSelected] = useState<Contact>();
  const {openModal, userHasConfirmed} = useModal();
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

  const deleteContactButton = (contact: Contact) => {
    setUserSelected(contact);
    openModal(`¿Seguro que desea eliminar a ${contact.name}?`, true);
  };

  const handleDeleteUser = useCallback(async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      dispatch(updateModalUserHasConfirmed(false));
      const response = await deleteContactService(userSelected?.id!, token);
      if (response) {
        dispatch(deleteContact(userSelected?.id!));
        dispatch(updateIndicatorVisible(false));
      }
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || '';
      openModal(errMessage, false, 'Error', 'alert-decagram', colors.error);
    } finally {
      dispatch(updateIndicatorVisible(false));
      setUserSelected(undefined);
    }
  }, [dispatch, openModal, token, userSelected]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  useEffect(() => {
    if (userHasConfirmed) {
      handleDeleteUser();
    }
  }, [handleDeleteUser, userHasConfirmed]);

  return {
    contactsList: filteredList,
    searchFunction,
    search: query,
    deleteContactButton,
  };
};
