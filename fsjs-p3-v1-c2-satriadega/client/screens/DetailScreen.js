import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../config/queries";
import DynamicHeader from "../components/DynamicHeader";
import { ActivityIndicator } from "react-native";

function DetailScreen({ route }) {
  const { postId } = route.params;
  const { loading, data, error } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });
  const [post, setPost] = useState({});
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  function Loading() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  useEffect(() => {
    console.log(data, "ini data");
    console.log(postId);
    setPost(data?.post || {});
  }, [data]);
  return (
    <View>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      {loading ? (
        Loading()
      ) : (
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 19,
              lineHeight: 28,
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {post.title}
          </Text>
          <Text
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 8,
              color: "gray",
            }}
          >
            Dibuat pada : {post.createdAt?.slice(0, 10)} - {post.Category?.name}
          </Text>
          <Image
            style={{ width: "100%", height: 220, marginTop: 8 }}
            source={{
              uri: post?.imgUrl,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              marginTop: 8,
              fontSize: 17,
              paddingLeft: 20,
              paddingRight: 20,
              lineHeight: 28,
            }}
          >
            {post.content}
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              fontWeight: 800,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            Tags : {post?.Tags?.map((el) => `#${el.name} `)}
          </Text>
          <Text
            style={{
              marginBottom: 80,
              marginTop: 7,
              color: "gray",
              fontSize: 15,
              fontWeight: 600,
              paddingLeft: 20,
              paddingRight: 20,
              lineHeight: 28,
            }}
          >
            Dibuat oleh : {post?.Author?.username}
          </Text>
        </ScrollView>
      )}
    </View>
  );
}

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

export default DetailScreen;
