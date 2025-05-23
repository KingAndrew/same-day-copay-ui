import { AppRegistry } from "react-native";
import App from "./src/App.jsx";
import appInfo from "./app.json";

const appName = appInfo.name || "SameDayCopayUI";

AppRegistry.registerComponent(appName, () => App);

// Register for web
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById("root"),
});