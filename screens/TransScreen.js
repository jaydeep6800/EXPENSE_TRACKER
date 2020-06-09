import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Color } from '../commons/Color';
import StatusBar from '../components/StatusBar';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createStackNavigator } from '@react-navigation/stack';

import TransMonthDetailScreen from './TransMonthDetailScreen';
import TransAddScreen from './TransAddScreen';
import TransDayDetailScreen from './TransDayDetailScreen';
import UpdateTransScreen from './UpdateTransScreen';
import UpdateTransferScreen from './UpdateTransferScreen';

const Stack = createStackNavigator();

const TransScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Home"
        component={TransMonthDetailScreen}
      />
      <Stack.Screen
        name="DayScreen"
        component={TransDayDetailScreen}
      />
      <Stack.Screen
        name="UpdateTransScreen"
        component={UpdateTransScreen}
      />
      <Stack.Screen
        name="UpdateTransferScreen"
        component={UpdateTransferScreen}
      />
      <Stack.Screen
        name="TransAdd"
        component={TransAddScreen}
      />
    </Stack.Navigator>
  );
};

export default TransScreen;
