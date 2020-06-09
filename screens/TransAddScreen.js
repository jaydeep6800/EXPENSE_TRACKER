import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Color } from '../commons/Color';
import StatusBar from '../components/StatusBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TransAddTitleBar from '../components/trans/TransAddTitleBar';
import IncomeTransScreen from './IncomeTransScreen';
import ExpenseTransScreen from './ExpenseTransScreen';
import TransferTransScreen from './TransferTransScreen';

const Tab = createMaterialTopTabNavigator();

const TransAddScreen = props => {
  //   const {state} = props.navigation;
  // console.log("PROPS " + state.params.user);

  var RouteName = 'TransferScreen';
  return (
    <View style={styles.container}>
      <StatusBar />
      <TransAddTitleBar
        Text="Transaction"
        navigation={props.navigation}
      />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize:
              (Dimensions.get('window').width * 4) / 100,
            fontWeight: 'bold',
            letterSpacing: 1
          },
          style: { backgroundColor: Color.primaryColor },
          activeTintColor: Color.subPrimaryColor,
          inactiveTintColor: Color.subSecondaryColor,
          indicatorStyle: {
            backgroundColor: Color.subSecondaryColor
          }
        }}
      >
        <Tab.Screen
          name="IncomeScreen"
          component={IncomeTransScreen}
          options={{ tabBarLabel: 'INCOME' }}
        />
        <Tab.Screen
          name="ExpenseScreen"
          component={ExpenseTransScreen}
          options={{ tabBarLabel: 'EXPENSE' }}
        />
        <Tab.Screen
          name="TransferScreen"
          component={TransferTransScreen}
          options={{ tabBarLabel: 'TRANSFER' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {}
});

export default TransAddScreen;
