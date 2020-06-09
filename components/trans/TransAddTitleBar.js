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

const TransAddTitleBar = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.goBack()}
      >
        <Text>
          <Icon style={styles.icon} name="arrow-left" />
        </Text>
      </TouchableOpacity>

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
  icon: {
    fontSize: (Dimensions.get('window').width * 6) / 100,
    color: Color.subPrimaryColor,
    width: '12%'
  },
  icon2: {
    fontSize: (Dimensions.get('window').width * 6) / 100,
    color: Color.subPrimaryColor,
    width: '12%'
  },
  font: {
    fontSize: (Dimensions.get('window').width * 4) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100,
    letterSpacing: 0.5,
    color: Color.subPrimaryColor,
    flex: 1
  }
});

export default TransAddTitleBar;
