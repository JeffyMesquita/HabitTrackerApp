import React from 'react';

import {Button, Icon, Screen, Text} from '@components';
import {AuthScreenProps} from '@routes';

export function SuccessScreen({
  route,
  navigation,
}: AuthScreenProps<'SuccessScreen'>) {
  const {title, description, icon} = route?.params;

  function goBackToBegin() {
    //TODO: implementar
    navigation.goBack();
  }

  return (
    <Screen>
      <Icon {...icon} />

      <Text mt="s24" mb="s32" preset="headingLarge">
        {title}
      </Text>

      <Text mb="s16" preset="paragraphLarge">
        {description}
      </Text>

      <Button mt="s40" onPress={goBackToBegin} title="Voltar ao início" />
    </Screen>
  );
}
