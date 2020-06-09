import React from "react";

// Navigation ...
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Screen ...
import TransScreen from "./screens/TransScreen";
import AccountsScreen from "./screens/AccountsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Color } from "./commons/Color";

//Redux ...
import { Provider } from "react-redux";
import { reduxStore } from "./redux/store";

const Tab = createBottomTabNavigator();

const store = reduxStore();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Tab.Navigator
          initialRouteName="Feed"
          tabBarOptions={{
            activeTintColor: Color.primaryColor,
            showLabel: false,
          }}
        >
          <Tab.Screen
            name="Trans"
            component={TransScreen}
            options={{
              tabBarLabel: "Trans",
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="swap-horizontal"
                  color={color}
                  size={size}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Accounts"
            component={AccountsScreen}
            options={{
              tabBarLabel: "Accounts",
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="wallet-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="settings-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default Navigation;
