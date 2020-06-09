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
    justifyContent: 'center'
  },
  font: {
    fontSize: (Dimensions.get('window').width * 4) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100,
    letterSpacing: 0.5,
    color: Color.subPrimaryColor
  }
});

export default TitleBar;
