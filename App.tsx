import React from 'react';
import {SafeAreaView, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text} from './src/components/Text/Text';
import {Button} from './src/components/Button/Button';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';
import {Box} from './src/components/Box/Box';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <View
          style={{
            paddingHorizontal: 24,
          }}>
          <Text preset="headingLarge" italic bold>
            Hello World!
          </Text>
          <Text preset="headingMedium">Hello World!</Text>

          <Button title="Press me" marginBottom="s24" />

          <Button preset="outline" title="Outline" marginBottom="s24" />

          <Button title="Press me" loading />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
