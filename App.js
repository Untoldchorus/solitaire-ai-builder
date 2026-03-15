// Solitaire AI Builder - Final Stable Build
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SolitaireBoard from './src/components/SolitaireBoard';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

export default function App() {
  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  /* if (!fontsLoaded) {
    return null;
  } */

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SolitaireBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a12',
  },
});
