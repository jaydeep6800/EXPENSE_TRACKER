import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Color } from '../commons/Color';

import StatusBar from '../components/StatusBar';
import CategoryDetailTitleBar from '../components/category/CategoryDetailTitleBar';
import IncomesDetailScreen from './IncomesDetailScreen';
import ExpensesDetailScren from './ExpensesDetailScren';

const Tab = createMaterialTopTabNavigator();

const CategoryDetailScreen = ({ navigation }) => {
  const [Modals, SetModals] = useState(false);
  const [index, setIndex] = useState(0);
  // navigation.state.index

  const toggleModal = () => SetModals(!Modals);
  const setIndexValue = index => setIndex(index);
  return (
    <View style={styles.container}>
      <StatusBar />
      <CategoryDetailTitleBar
        Text="Manage Categories"
        navigation={navigation}
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
          name="IncomeCategory"
          component={IncomesDetailScreen}
          options={{ tabBarLabel: 'INCOME' }}
        />
        <Tab.Screen
          name="ExpenseCategory"
          component={ExpensesDetailScren}
          options={{ tabBarLabel: 'EXPENSE' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default CategoryDetailScreen;
