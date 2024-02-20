import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen, MyProfileScreen} from '@screens';

import {AppTabBar} from './AppTabBar';


export type AppTabBottomTabParamList = {
  HomeScreen: undefined;
  MyProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<AppTabBottomTabParamList>();

export function AppTabNavigator() {
  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />;
  }

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen">
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Tab.Navigator>
  );
}
