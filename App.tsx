import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text} from './src/components/Text/Text';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text preset="headingLarge" italic bold>
        Hello World!
      </Text>
      <Text preset="headingMedium">Hello World!</Text>
    </SafeAreaView>
  );
}

export default App;
