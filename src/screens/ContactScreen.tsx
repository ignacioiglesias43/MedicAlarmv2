import React, {FC} from 'react';
import {ListRenderItem, FlatList} from 'react-native';

import {useContacts} from '../hooks/useContacts';
import {Contact} from '../api/contact/model/Contact';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContactStackParams} from '../navigation/stacks/ContactStack';

import CustomHeader from '../components/atoms/CustomHeader';
import CustomFAB from '../components/atoms/CustomFAB';
import CustomSearcher from '../components/atoms/CustomSearcher';
import NoDataCard from '../components/atoms/NoDataCard';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';

interface ContactScreenProps
  extends NativeStackScreenProps<ContactStackParams, 'Contact'> {}

const ContactScreen: FC<ContactScreenProps> = ({navigation}) => {
  const {contactsList, searchFunction, search, deleteContactButton} =
    useContacts();

  const renderItem: ListRenderItem<Contact> = ({item}) => (
    <DataCard
      title={item.name}
      fisrt={item.phone}
      actionIcon={'delete'}
      type="personal"
      action={() => deleteContactButton(item)}
      onPress={() =>
        navigation.navigate('Update', {contact: item, actionType: 'UPDATE'})
      }
    />
  );

  return (
    <ViewContainer>
      <FlatList
        data={contactsList}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <NoDataCard text="No se han agregado contactos." />
        )}
        ListHeaderComponent={() => (
          <CustomHeader>
            <CustomSearcher
              value={search}
              onChangeText={text => {
                searchFunction(text);
              }}
            />
          </CustomHeader>
        )}
        keyExtractor={item => `${item.id}`}
      />
      <CustomFAB
        onPress={() =>
          navigation.navigate('Update', {
            actionType: 'ADD',
          })
        }
      />
    </ViewContainer>
  );
};

export default ContactScreen;
