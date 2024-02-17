import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Router} from '@routes';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from '@theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
