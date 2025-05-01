import { AppRegistry } from "react-native";
import App from "./App";
import appName from "./app.json"; // Change this line to import the default export

AppRegistry.registerComponent(appName, () => App);

// Register for web
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById("root"),
});
