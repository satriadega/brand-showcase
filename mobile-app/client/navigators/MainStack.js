import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Homes" component={HomeScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        initialParams={{ id: 0, data: {} }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
