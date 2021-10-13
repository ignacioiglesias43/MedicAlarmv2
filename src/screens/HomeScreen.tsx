import React from 'react';
import {View, Text, FlatList} from 'react-native';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';

const HomeScreen = () => {
  return (
    <ViewContainer>

      {/* <FlatList /> */}
      <DataCard title="Opcion 1" fisrt={"10:30"} second={"5 hrs"} actionIcon={"delete"} action={()=>console.log("Hola")}/>
    </ViewContainer>
  );
};

export default HomeScreen;
