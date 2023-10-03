import { ScrollView, Text, Animated, StyleSheet, Button } from "react-native";
import React, { useEffect, useRef } from "react";
import DynamicHeader from "../components/DynamicHeader";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../config/queries";
import Card from "../components/Card";
import { ActivityIndicator, View } from "react-native";

function HomeScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_POSTS);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  function Loading() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  useEffect(() => {
    console.log(data);
  });

  return (
    <>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      {loading && Loading()}
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
      >
        {data?.posts.map((el, index) => (
          <Card post={el} key={`index-${index}`} />
        ))}
      </ScrollView>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    margin: 0,
  },
  scrollText: {
    fontSize: 19,
    textAlign: "center",
    padding: 20,
    color: "#000",
  },
});
