import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = useColorScheme();

  // Load dark mode preference from AsyncStorage
  useEffect(() => {
    const loadDarkModePreference = async () => {
      const savedMode = await AsyncStorage.getItem('darkModeEnabled');
      if (savedMode !== null) {
        setDarkMode(savedMode === 'true');
      } else {
        setDarkMode(colorScheme === 'dark');
      }
    };
    loadDarkModePreference();
  }, [colorScheme]);

  // Toggle dark mode
  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('darkModeEnabled', newMode.toString());
  };

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.text, darkMode ? styles.darkText : styles.lightText]}>
        Dark Mode Toggle
      </Text>
      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />
      <StatusBar style={darkMode ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    backgroundColor: 'white',
  },
  dark: {
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});
