// Solitaire AI Builder - Final Stable Build
console.log("APP_INIT: Script loaded and executing...");
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SolitaireBoard from './src/components/SolitaireBoard';

export default function App() {
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
