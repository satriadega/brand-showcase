import { Image, View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Card({ post }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={post?.id}
      onPress={() => {
        console.log("Pindah ke detail");
        navigation.navigate("Detail", {
          postId: post?.id,
        });
      }}
      style={{
        flexDirection: "row",
        gap: 8,
        padding: 8,
        borderBottomColor: "black",
        borderBottomWidth: 0.2,
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: post.imgUrl,
        }}
        resizeMode="cover"
      />
      <View style={{ width: "60%", marginRight: 8 }}>
        <Text
          style={{
            color: "red",
            fontSize: 17,
            fontWeight: 600,
          }}
        >
          {post.Category.name.toUpperCase()}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{post.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    minHeight: 120,
    width: 140,
  },
});
