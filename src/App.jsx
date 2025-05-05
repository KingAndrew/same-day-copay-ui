import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenTemplate } from './components';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;