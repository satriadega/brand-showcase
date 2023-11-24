import * as React from "react";
import { Text, View, StyleSheet, Animated, Image } from "react-native";

const Header_Max_Height = 120;
const Header_Min_Height = 60;

export default function DynamicHeader({ animHeaderValue }) {
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
          backgroundColor: "black",
        },
      ]}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn.cnnindonesia.com/cnnid/images/logo.webp?v=10.10.6",
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 0,
          backgroundColor: "black",
          zIndex: 1,
          paddingTop: 20,
        }}
      >
        <Text style={styles.headerText}>TERBARU</Text>
        <Text style={styles.headerText}>FOKUS</Text>
        <Text style={styles.headerText}>TERPOPULER</Text>
        <Text style={styles.headerText}>NASIONAL</Text>
        <Text style={styles.headerText}>EKONOMI</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 2,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    padding: 8,
    fontWeight: "400",
    textAlign: "center",
  },
  image: {
    marginLeft: 10,
    height: 54,
    width: 54,
  },
});
