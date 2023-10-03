import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dummy from "../screens/Dummy";
import HomeScreen from "../screens/HomeScreen";
import { SafeAreaView } from "react-native";
import { ScrollView, Text, View, Animated, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MainStack from "./MainStack";

const MainTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "black" }}
      >
        <Tab.Screen
          name="Home"
          component={MainStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Entypo
                  name="home"
                  color={focused ? "black" : "grey"}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="For You"
          component={Dummy}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialIcons
                  name="contact-page"
                  color={focused ? "black" : "grey"}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="CNN TV"
          component={Dummy}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="youtube-tv"
                  color={focused ? "black" : "grey"}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Dummy}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name="md-person-sharp"
                  color={focused ? "black" : "grey"}
                  size={size}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    margin: 0,
  },
  scrollText: {
    fontSize: 19,
    textAlign: "center",
    padding: 20,
    color: "#000",
  },
});
