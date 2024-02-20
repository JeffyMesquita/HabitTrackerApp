import React, {useEffect} from 'react';

import {ActivityIndicator, Box} from '@components';
import {useUserProfile} from '@domain';
import {useAppTheme} from '@hooks';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useAuthCredentials, useToastService} from '@services';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export function Router() {
  const {authCredentials, isLoading} = useAuthCredentials();
  const {showToast} = useToastService();
  const {me} = useUserProfile({
    onError: message => showToast({message, type: 'error'}),
  });

  useEffect(() => {
    if (authCredentials) {me();}
  }, [authCredentials]);

  const {colors} = useAppTheme();

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };

  if (isLoading) {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="background">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <NavigationContainer theme={myTheme}>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
