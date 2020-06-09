import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Color } from '../../commons/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransScreenTitleBar = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.font}>{props.Text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: (Dimensions.get('window').height * 6) / 100,
    backgroundColor: Color.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    marginLeft: (Dimensions.get('window').width * 4) / 100,
    marginRight: (Dimensions.get('window').width * 4) / 100
  },
  font: {
    fontSize: (Dimensions.get('window').width * 4) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100,
    letterSpacing: 0.5,
    color: Color.subPrimaryColor,
    flex: 1
  }
});

export default TransScreenTitleBar;
