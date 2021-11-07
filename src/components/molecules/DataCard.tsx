import React, {FC} from 'react';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import {Card, Caption, Divider, IconButton} from 'react-native-paper';
import colors from '../../styles/colors';

interface DataCardProps {
  title: string;
  type?: 'reminder' | 'citation' | 'personal';
  fisrt: string;
  second?: string;
  actionIcon?: false | string;
  action?: () => void;
  onPress?: () => void | false;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

const DataCard: FC<DataCardProps> = ({
  title,
  fisrt,
  type = 'reminder',
  second,
  actionIcon,
  action,
  onPress,
  titleStyle,
  subtitleStyle,
}) => {
  return (
    <Card style={styles.card} elevation={0} onPress={onPress}>
      <Card.Title title={title} titleStyle={[styles.title, titleStyle]} />
      <Card.Content style={styles.cardContent}>
        <View>
          <Caption style={[styles.caption, subtitleStyle]}>
            {type === 'reminder' ? 'Siguiente:' : ''} {fisrt}
          </Caption>
          {second && (
            <Caption style={[styles.caption, subtitleStyle]}>
              {type === 'reminder' ? 'Frecuencia:' : ''} {second}
            </Caption>
          )}
        </View>
        {actionIcon && (
          <IconButton
            icon={actionIcon}
            color={colors.accent}
            size={30}
            onPress={action}
          />
        )}
      </Card.Content>
      <Divider style={styles.divider} />
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
