import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Redux ...
import { connect } from 'react-redux';
import { deleteAccount } from '../../redux/actions/Account';

import { Color } from '../../commons/Color';

const displayList = (
  item,
  toggleModal,
  stateAcName,
  stateAcId,
  stateToggleDialog
) => {
  const openModal = async (name, id) => {
    await stateAcName(name);
    await stateAcId(id);
    await toggleModal();
  };
  return (
    <View style={styles.list}>
      <View style={styles.list1}>
        <Text style={styles.text}>{item.item.name}</Text>
      </View>
      <View style={styles.list2}>
        <TouchableOpacity
          onPress={() =>
            openModal(item.item.name, item.item.accountId)
          }
          style={{
            marginRight:
              (Dimensions.get('window').width * 3) / 100
          }}
        >
          <Text>
            <Icon style={styles.icon} name="pencil" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await stateToggleDialog(item.item.accountId);
          }}
        >
          <Text>
            <Icon style={styles.icon} name="delete" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AccountsDetailList = props => {
  const [accountData, setAccountData] = useState([]);

  const stateToggleDialog = async id => {
    await Alert.alert(
      'Are you sure?',
      `You can't recever this Account once deleted.`,
      [
        {
          text: 'CANCEL',
          onPress: () => {}
        },
        {
          text: 'OK',
          onPress: async () => {
            await props.delete(id);
          }
        }
      ]
    );
  };

  useEffect(() => {
    const getData = async () => {
      const Result = await props.accounts;

      if (await Result) {
        setAccountData(Result.rows._array);
      }
    };
    getData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.listContainer}>
          <FlatList
            data={accountData}
            renderItem={item =>
              displayList(
                item,
                props.toggleModal,
                props.stateAcName,
                props.stateAcId,
                stateToggleDialog
              )
            }
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
    height: (Dimensions.get('window').height * 5) / 100,
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
    fontSize: (Dimensions.get('window').width * 5) / 100,
    marginRight: (Dimensions.get('window').width * 5) / 10,
    color: Color.grayColor
  },
  text: {
    fontSize: (Dimensions.get('window').width * 4) / 100,
    color: Color.grayColor
  }
});

const mapStateToProps = state => {
  return {
    accounts: state.AccountReducer.accountList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete: key => dispatch(deleteAccount(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsDetailList);
