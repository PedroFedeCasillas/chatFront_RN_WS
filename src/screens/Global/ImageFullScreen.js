import React from "react";
import { View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

export function ImageFullScreen() {
  const { params } = useRoute();

  return (
    <View>
      <Image
        source={{ uri: params.uri }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
}
