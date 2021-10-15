import React from 'react';
import {ListRenderItem, FlatList} from 'react-native';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';
import useReminder from '../hooks/useReminder';

import {Reminder} from '../api/reminder/model/Reminder';
import NoDataCard from '../components/atoms/NoDataCard';
import CustomFAB from '../components/atoms/CustomFAB';
import CustomSearcher from '../components/atoms/CustomSearcher';
import CustomHeader from '../components/atoms/CustomHeader';

const HomeScreen = () => {
  const {reminderList, updateQuery, query} = useReminder();

  const renderItem: ListRenderItem<Reminder> = ({item}) => (
    <DataCard
      title={item.name}
      fisrt={item.next_hour}
      second={`${item.frecuency} hrs`}
      actionIcon={'delete'}
      action={() => console.log('Hola')}
    />
  );

  return (
    <ViewContainer>
      <FlatList
        data={reminderList}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <NoDataCard text="No se han agregado recordatorios." />
        )}
        ListHeaderComponent={() => (
          <CustomHeader>
            <CustomSearcher value={query} onChangeText={updateQuery} />
          </CustomHeader>
        )}
        keyExtractor={item => `${item.id}`}
      />
      <CustomFAB onPress={() => {}} />
    </ViewContainer>
  );
};

export default HomeScreen;
