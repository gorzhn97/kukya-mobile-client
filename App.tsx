import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { RootNavigator } from './src/app/navigation';
import { AppContextProvider } from './src/contexts/app/AppProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
enableScreens();
const queryClient = new QueryClient()
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
        </SafeAreaProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;