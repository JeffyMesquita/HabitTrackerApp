import React from 'react';

import {IconProps} from '@components';
import {useAppTheme} from '@hooks';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  ConfirmEmailScreen,
  SuccessScreen,
  ResetPasswordScreen,
} from '@screens';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ConfirmEmailScreen: undefined;
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: {
    email: string;
  };
  SuccessScreen: {
    title: string;
    description: string;
    icon: Pick<IconProps, 'name' | 'color'>;
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  const {colors} = useAppTheme();

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        contentStyle: {backgroundColor: colors.background},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}
