import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/Navigation/StackNavigator";
import { SettingsProvider } from "./src/Screens/SettingsScreen";

export default function App() {
  return (
    <NavigationContainer>
      <SettingsProvider>
        <StackNavigator />
      </SettingsProvider>
    </NavigationContainer>
  );
}
