import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import AccountsDetailTitleBar from '../components/account/AccountsDetailTitleBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Color } from '../commons/Color';
import StatusBar from '../components/StatusBar';

import AccountsDetailList from '../components/account/AccountsDetailList';
import AccountsModals from '../components/account/AccountsModals';
import AccountsEditModals from '../components/account/AccountsEditModals';

const AccountsDetailScreen = ({ navigation }) => {
  const [Modals, SetModals] = useState(false);
  const [EditModals, SetEditModals] = useState(false);
  const [AcId, SetAcId] = useState('');
  const [AcName, SetAcName] = useState('');

  const toggleModal = () => SetModals(!Modals);
  const toggleEditModal = () => SetEditModals(!EditModals);
  const stateAcId = id => SetAcId(id);
  const stateAcName = name => SetAcName(name);

  return (
    <View style={styles.container}>
      <AccountsModals
        state={Modals}
        toggleModal={toggleModal}
      />
      <AccountsEditModals
        state={EditModals}
        toggleModal={toggleEditModal}
        acNamee={AcName}
        acIdd={AcId}
      />
      <StatusBar />
      <AccountsDetailTitleBar
        Text="Manage Account"
        navigation={navigation}
        toggleModal={toggleModal}
      />
      <AccountsDetailList
        toggleModal={toggleEditModal}
        stateAcName={stateAcName}
        stateAcId={stateAcId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.subSecondaryColor
  },
  title: {
    fontSize: (Dimensions.get('window').width * 3) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100
  },
  listContainer: {
    backgroundColor: Color.subPrimaryColor,
    borderBottomWidth: 1,
    borderBottomColor: Color.secondaryColor
  },
  list: {
    height: (Dimensions.get('window').height * 7) / 100,
    borderBottomWidth: 0.3,
    borderBottomColor: Color.secondaryColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list1: {
    marginLeft: (Dimensions.get('window').width * 5) / 100
  },
  list2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: (Dimensions.get('window').width * 5) / 100
  },
  icon: {
    fontSize: (Dimensions.get('window').width * 6) / 100,
    marginRight: (Dimensions.get('window').width * 5) / 10,
    color: Color.grayColor
  },
  text: {
    fontSize: (Dimensions.get('window').width * 5) / 100,
    color: Color.grayColor
  }
});

export default AccountsDetailScreen;
