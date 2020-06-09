import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Color } from '../commons/Color';
import StatusBar from '../components/StatusBar';
import TitleBar from '../components/account/TitleBar';
import DisplayBalance from '../components/account/DisplayBalance';
import AccountsList from '../components/account/AccountsList';

//Redux ...
import { connect } from 'react-redux';

const AccountsScreen = props => {
  const [accountData, setAccountData] = useState([]);
  var totalBalance = 0;

  useEffect(() => {
    const getData = async () => {
      const Result = await props.accounts;

      if (await Result) {
        await setAccountData(Result.rows._array);
      }
    };
    getData();
  });

  if (accountData) {
    accountData.map(obj => {
      totalBalance = totalBalance + obj.price;
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <TitleBar Text="Accounts" />
      <DisplayBalance Balance={`$ ${totalBalance}`} />
      <AccountsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

const mapStateToProps = state => {
  return {
    accounts: state.AccountReducer.accountList
  };
};

export default connect(
  mapStateToProps,
  null
)(AccountsScreen);
