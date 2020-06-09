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

const AccountsDetailTitleBar = props => {
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
      <TouchableOpacity
        style={styles.button}
        onPress={props.toggleModal}
      >
        <Text>
          <Icon style={styles.icon2} name="plus" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: (Dimensions.get('window').height * 6) / 100,
    backgroundColor: Color.primaryColor,
    justifyContent: 'space-between',
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

export default AccountsDetailTitleBar;
