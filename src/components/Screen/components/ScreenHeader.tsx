import React from 'react';
import {Image} from 'react-native';

import {Box, Icon, ScreenProps, Text, TouchableOpacityBox} from '@components';
import {useNavigation} from '@react-navigation/native';
import {useUserProfileInfo} from '@services';

type Props = Pick<ScreenProps, 'canGoBack' | 'title' | 'isAppStack'>;

const ICON_SIZE = 20;

export function ScreenHeader({canGoBack, title, isAppStack = false}: Props) {
  const {userProfile} = useUserProfileInfo();
  const navigation = useNavigation();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      mb="s24">
      {canGoBack && (
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          onPress={navigation.goBack}
          gap="s8">
          <Icon size={ICON_SIZE} name="arrowLeft" color="primary" />
          {!title && (
            <Text preset="paragraphMedium" bold>
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {title && (
        <Text preset="headingSmall" color="neutral400">
          {title}
        </Text>
      )}
      {title && <Box width={ICON_SIZE} />}
      {isAppStack && !userProfile?.profile.avatarUrl && (
        <Box
          backgroundColor="primary"
          height={48}
          width={48}
          borderRadius="s24"
          alignItems="center"
          justifyContent="center"
          borderWidth={2}
          position="absolute"
          top={0}
          right={0}
          borderColor="neutral300">
          <Text preset="headingLarge" bold mt="s4">
            {userProfile?.profile.firstName.charAt(0).toUpperCase()}
          </Text>
        </Box>
      )}
      {isAppStack && userProfile?.profile.avatarUrl && (
        <Box
          height={48}
          width={48}
          borderRadius="s24"
          position="absolute"
          top={0}
          right={0}
          borderColor="neutral300"
          borderWidth={2}
          overflow="hidden"
          justifyContent="center"
          alignItems="center">
          <Image
            source={{uri: userProfile?.profile.avatarUrl}}
            style={{
              height: 46,
              width: 46,
              borderRadius: 23,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
