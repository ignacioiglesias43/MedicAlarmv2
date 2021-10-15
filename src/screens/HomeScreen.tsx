import React, {useEffect} from 'react';
import {View, ListRenderItem, FlatList} from 'react-native';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';
import useReminder from '../hooks/useReminder';

import {Reminder} from '../api/reminder/model/Reminder';

const HomeScreen = () => {
  const {reminders} = useReminder();

  useEffect(() => {
    console.log(reminders);
  }, []);

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
        data={reminders}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />

    </ViewContainer>
  );
};

export default HomeScreen;
