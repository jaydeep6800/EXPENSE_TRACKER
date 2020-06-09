import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { Color } from '../../commons/Color';

const TitleBar = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.font}>{props.Text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: (Dimensions.get('window').height * 6) / 100,
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
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
  font: {
    fontSize: (Dimensions.get('window').width * 4) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100,
    letterSpacing: 0.5,
    color: Color.subPrimaryColor
  }
});

export default TitleBar;
