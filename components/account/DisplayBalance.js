import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { Color } from '../../commons/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DisplayBalance = props => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="cash-100" />
      <Text
        style={styles.font}
      >{`Total Balance : ${props.Balance}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: (Dimensions.get('window').height * 7) / 100,
    flexDirection: 'row',
    backgroundColor: Color.subPrimaryColor,
    paddingLeft: (Dimensions.get('window').width * 6) / 100,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    shadowColor: Color.subPrimaryColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 2
  },
  icon: {
    fontSize: (Dimensions.get('window').width * 7) / 100,
    letterSpacing: 0.5,
    color: Color.secondaryColor
  },
  font: {
    fontSize: (Dimensions.get('window').width * 5) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100,
    letterSpacing: 0.5,
    color: Color.secondaryColor
  }
});

export default DisplayBalance;
