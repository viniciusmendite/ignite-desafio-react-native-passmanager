import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import Toast from 'react-native-toast-message';

import { AppRoutes } from './src/routes/app.routes';
import { StorageDataProvider } from './src/contexts/StorageDataContext';
import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <StorageDataProvider>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </StorageDataProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}