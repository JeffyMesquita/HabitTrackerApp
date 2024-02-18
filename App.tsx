import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Router} from '@routes';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from '@theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
