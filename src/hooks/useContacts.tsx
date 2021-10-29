import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {useAppDispatch} from '../store/hooks';
import {Contact} from '../api/contact/model/Contact';
import {useQuery} from './useQuery';
import {deleteContactService, getContactService} from '../api/contact/services';
import {deleteContact, updateContacts} from '../store/contacts/actionCreators';
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

  useEffect(() => {
    getContacts();
  }, [token]);

  const getContacts = async () => {
    try {
      const response = await getContactService(token);
      if (response) {
        const {data} = response.data;
        dispatch(updateContacts(data));
      }
    } catch (error: any) {
      console.log({...error});
    }
  };

  const deleteContactButton = async (contact: Contact) => {
    //TODO Modal de confirmación
    dispatch(updateIndicatorVisible(true));
    try {
      const response = await deleteContactService(contact.id, token);
      if (response) {
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
