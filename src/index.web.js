
// Entry point for the web version of the app
import { AppRegistry } from 'react-native';
import App from './App.jsx';
import appInfo from '../app.json';

// Use the name property from app.json
const appName = appInfo.name || "SameDayCopayUI";

// Register the App component
AppRegistry.registerComponent(appName, () => App);

// Initialize the app for web
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root') || document.getElementById('app')
});
