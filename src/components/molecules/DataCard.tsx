import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Caption, Divider, IconButton} from 'react-native-paper';
import colors from '../../styles/colors';

interface DataCardProps {
  title: string;
  type?: 'reminder' | 'citation';
  fisrt: string;
  second: string;
  actionIcon?: string;
  action?: () => void;
}

const DataCard = ({
  title,
  fisrt,
  type = 'reminder',
  second,
  actionIcon,
  action,
}: DataCardProps) => {
  return (
    <Card style={styles.card} elevation={0}>
      <Card.Title title={title} titleStyle={styles.title} />
      <Card.Content style={styles.cardContent}>
        <View>
          <Caption style={styles.caption}>
            {type === 'reminder' ? 'Siguiente' : ''}: {fisrt}
          </Caption>
          <Caption style={styles.caption}>
            {type === 'reminder' ? 'Frecuencia' : ''}: {second}
          </Caption>
        </View>
        {actionIcon ? (
          <IconButton
            icon={actionIcon}
            color={colors.accent}
            size={30}
            onPress={action}
          />
        ) : null}
      </Card.Content>
      <Divider style={styles.divider}></Divider>
    </Card>
  );
};

export default DataCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    marginHorizontal: 0,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
  },
  caption: {
    fontSize: 16,
    marginVertical: 2,
  },
  divider: {
    marginTop: 10,
    marginHorizontal: 15,
  },
});
