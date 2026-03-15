// Solitaire AI Builder - Final Stable Build
console.log("APP_INIT: Script loaded and executing...");
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import SolitaireBoard from './src/components/SolitaireBoard';

export default function App() {
  console.log("APP_RENDER: App component is rendering...");
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SolitaireBoard />
      <Text style={{ position: 'absolute', top: 50, left: 10, color: 'white', backgroundColor: 'red', padding: 10, zIndex: 9999 }}>
        Debug: App Component Active
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a12',
  },
});
