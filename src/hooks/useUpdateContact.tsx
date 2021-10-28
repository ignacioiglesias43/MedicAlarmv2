import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {useForm} from './useForm';
import {useAppDispatch} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {Contact} from '../api/contact/model/Contact';
import {addContactService, updateContactService} from '../api/contact/services';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {
  updateModalMessage,
  updateModalTitle,
  updateModalIconColor,
  updateModalVisible,
  updateModalIcon,
} from '../store/modal/actionCreators';
import colors from '../styles/colors';
import {addContact, deleteContact} from '../store/contacts/actionCreators';
import {ResultedContactCreate} from '../api/contact/dto/resulted-contact.dto';
import {initialContactForm} from '../constants/addContactForm';

export const useUpdateContact = (
  actionType: 'UPDATE' | 'ADD',
  contact?: Contact | undefined,
) => {
  const {createChangeHandler, formFields} = useForm<Contact, Contact>(
    actionType === 'UPDATE' ? contact!! : initialContactForm,
  );

  const contactOgData: Contact = contact!!;
  const {token} = useSelector((state: RootState) => state.authReducer);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const submitForm = async () => {
    try {
      const result =
        actionType === 'ADD'
          ? await handleAdd(formFields as Contact)
          : await handleUpdate(formFields as Contact);

      if (result) {
        const {data} = result.data as ResultedContactCreate;
        if(actionType === "ADD"){
          dispatch(addContact({...data}));
        }else{
          dispatch(deleteContact(data.id));
          dispatch(addContact({...data}));
        }
        dispatch(updateIndicatorVisible(false));
        navigation.goBack();
      }
    } catch (error: any) {
      dispatch(updateIndicatorVisible(false));
      if (error.response) {
        dispatch(updateModalTitle('Error'));
        dispatch(updateModalMessage(error?.response?.data?.message || ''));
        dispatch(updateModalIcon('alert-decagram'));
        dispatch(updateModalIconColor(colors.error));
        dispatch(updateModalVisible(true));
      }
    }
  };

  const handleAdd = (fields: Contact) => {
    const {name, phone} = fields;
    if (name.trim() && phone.trim() && phone.length === 10) {
      dispatch(updateIndicatorVisible(true));
      return addContactService({name, phone}, token);
    } else {
      dispatch(updateModalTitle('Advertencia'));
      dispatch(
        updateModalMessage(
          'Todos los campos son necesarios y el télefono debe ser a 10 digitos.',
        ),
      );
      dispatch(updateModalIcon('alert-decagram'));
      dispatch(updateModalIconColor(colors.warning));
      dispatch(updateModalVisible(true));
    }
  };

  const handleUpdate = (fields: Contact) => {
    const {name, phone, id} = fields;
    dispatch(updateIndicatorVisible(true));
    if(name !== contactOgData.name || phone!==contactOgData.phone){
      return updateContactService({name, phone, id}, token)
    }
  };



  return {
    formFields,
    submitForm,
    setValues: createChangeHandler,
  };
};
