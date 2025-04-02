import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} size="large" color="#0891b2" />
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#0891b2" }}>
        Cargando...
      </Text>
    </View>
  );
}
