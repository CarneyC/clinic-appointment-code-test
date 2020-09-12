import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AuthContextProvider from "./stores/AuthContextProvider";
import AgendaContextProvider from "./stores/AgendaContextProvider";
import {Montserrat_300Light, useFonts} from "@expo-google-fonts/montserrat";
import useCustomFonts from "./hooks/useCustomFonts";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  useCustomFonts();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextProvider>
          <AgendaContextProvider>
            <>
              <Navigation colorScheme={colorScheme}/>
              <StatusBar/>
            </>
          </AgendaContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    );
  }
}
