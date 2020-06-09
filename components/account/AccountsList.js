import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Settings,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Color } from '../../commons/Color';

//Redux ...
import { connect } from 'react-redux';
import {
  editAccount,
  deleteAccount
} from '../../redux/actions/Account';

const displayList = item => {
  return (
    <View style={styles.list}>
      <TouchableOpacity style={styles.button}>
        <View style={styles.touchableList}>
          <Text> {item.item.name} </Text>
          <Text>$ {item.item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const AccountsList = props => {
  const [accountData, setAccountData] = useState([]);
  const GetData = async () => {
    const Result = await props.accounts;

    setAccountData(Result.rows._array);
  };
  GetData();

  return (
    <View style={styles.container}>
      {/* Content 1 */}
      <View style={styles.content}>
        <Text style={styles.title}>Accounts Balance</Text>

        <View style={styles.listContainer}>
          <FlatList
            data={accountData}
            renderItem={item => displayList(item)}
            keyExtractor={item => item.accountId.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.subSecondaryColor
  },
  content: {
    paddingTop: (Dimensions.get('window').height * 2) / 100
  },
  title: {
    fontSize: (Dimensions.get('window').width * 3) / 100,
    marginLeft: (Dimensions.get('window').width * 3) / 100
  },
  listContainer: {
    marginTop: (Dimensions.get('window').height * 1) / 100,
    backgroundColor: Color.subPrimaryColor
  },
  list: {
    height: (Dimensions.get('window').height * 5) / 100,
    borderBottomWidth: 1,
    borderBottomColor: Color.subSecondaryColor,
    justifyContent: 'center'
  },
  touchableList: {
    paddingLeft: (Dimensions.get('window').width * 5) / 100,
    paddingRight:
      (Dimensions.get('window').width * 5) / 100,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = state => {
  return {
    accounts: state.AccountReducer.accountList
  };
};

export default connect(mapStateToProps, null)(AccountsList);
