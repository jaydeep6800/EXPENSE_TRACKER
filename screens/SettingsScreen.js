import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Settings,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Color } from '../commons/Color';
import TitleBar from '../components/setting/TitleBar';
import StatusBar from '../components/StatusBar';

import { createStackNavigator } from '@react-navigation/stack';
import AccountsDetailScreen from './AccountsDetailScreen';
import CategoryDetailScreen from './CategoryDetailScreen';

const UI = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <TitleBar Text="Settings" />
      <ScrollView>
        {/* Content 1 */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Category / Account
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.list}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('CategoryDetail')
                }
              >
                <View style={styles.touchableList}>
                  <Text> Manage Category </Text>
                  <Icon
                    style={styles.icon}
                    name="chevron-right"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('AccountsDetail')
                }
              >
                <View style={styles.touchableList}>
                  <Text> Manage Account </Text>
                  <Icon
                    style={styles.icon}
                    name="chevron-right"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Content 2 */}
        <View style={styles.content}>
          <Text style={styles.title}>Backup / Restore</Text>
          <View style={styles.listContainer}>
            <View style={styles.list}>
              <TouchableOpacity style={styles.button}>
                <View style={styles.touchableList}>
                  <Text> Backup to Dropbox </Text>
                  <Icon
                    style={styles.icon}
                    name="chevron-right"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <TouchableOpacity style={styles.button}>
                <View style={styles.touchableList}>
                  <Text> Restore from Dropbox </Text>
                  <Icon
                    style={styles.icon}
                    name="chevron-right"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <TouchableOpacity style={styles.button}>
                <View style={styles.touchableList}>
                  <Text> backup to Google Drive </Text>
                  <Icon
                    style={styles.icon}
                    name="chevron-right"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <TouchableOpacity style={styles.button}>
                <View style={styles.touchableList}>
                  <Text> Restore from Google Drive </Text>
                  <Icon
                    style={styles.icon}
                    name="chevron-right"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

const SettingsScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={UI} />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
      />
      <Stack.Screen
        name="AccountsDetail"
        component={AccountsDetailScreen}
      />
    </Stack.Navigator>
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
    paddingLeft: (Dimensions.get('window').width * 3) / 100,
    paddingRight:
      (Dimensions.get('window').width * 3) / 100,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: (Dimensions.get('window').width * 6) / 100
  }
});

export default SettingsScreen;
