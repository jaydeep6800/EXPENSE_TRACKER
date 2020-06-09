import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';

import { Color } from '../commons/Color';

const StatusBar = () => {
  return <View style={styles.statusBar} />;
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Color.statusBarColor,
    height: Constants.statusBarHeight
  }
});

export default StatusBar;
