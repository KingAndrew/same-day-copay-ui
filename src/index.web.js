
// Entry point for the web version of the app
import { AppRegistry } from 'react-native';
import App from './App.jsx';
import { name as appName } from '../app.json';

// Register the App component
AppRegistry.registerComponent(appName, () => App);

// Initialize the app for web
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root') || document.getElementById('app')
});
