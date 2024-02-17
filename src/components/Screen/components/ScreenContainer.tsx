import React from 'react';
import {ScrollView, View} from 'react-native';

interface Props {
  backgroundColor: string;
  children: React.ReactNode;
}

export function ScrollViewContainer({backgroundColor, children}: Props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        backgroundColor,
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({backgroundColor, children}: Props) {
  return (
    <View
      style={{
        backgroundColor,
        flex: 1,
      }}>
      {children}
    </View>
  );
}
