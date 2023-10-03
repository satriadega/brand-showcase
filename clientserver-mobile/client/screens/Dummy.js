import { Text, View, Button, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Dummy = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>This is a Dummy Page!</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default Dummy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
