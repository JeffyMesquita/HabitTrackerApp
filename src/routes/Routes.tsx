import React, {useEffect} from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAppTheme} from '@hooks';
import {useAuthCredentials, useToastService} from '@services';
import {useUserProfile} from '@domain';

export function Router() {
  const {authCredentials} = useAuthCredentials();
  const {showToast} = useToastService();
  const {me} = useUserProfile({
    onError: message => showToast({message, type: 'error'}),
  });

  useEffect(() => {
    if (authCredentials) me();
  }, [authCredentials]);

  const {colors} = useAppTheme();

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };

  return (
    <NavigationContainer theme={myTheme}>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
