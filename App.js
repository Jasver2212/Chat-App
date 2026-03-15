import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/Navigation/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
