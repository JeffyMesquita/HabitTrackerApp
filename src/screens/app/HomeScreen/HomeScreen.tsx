import {Box, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';
import React from 'react';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  return (
    <Screen>
      <Text preset="headingSmall">Home Screen</Text>
    </Screen>
  );
}
