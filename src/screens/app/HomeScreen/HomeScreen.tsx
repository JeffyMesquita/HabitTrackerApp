import React from 'react';

import {Box, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';
import {useUserProfileInfo} from '@services';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {userProfile, isLoading} = useUserProfileInfo();

  return (
    <Screen title="Minhas Tarefas" isAppStack>
      <Text preset="headingLarge">Bem Vindo!</Text>
      <Text preset="paragraphLarge" color="neutral700">
        O que você deseja fazer hoje,{' '}
        {userProfile?.profile.firstName
          ? userProfile?.profile.firstName
          : 'Visitante'}
        ?
      </Text>

      {isLoading && !userProfile ? <Text>Carregando...</Text> : <Box />}
    </Screen>
  );
}
