import { NavigationContainer } from "@react-navigation/native";
import Auth from "./screen/Auth";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Auth"
          component={Auth}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
