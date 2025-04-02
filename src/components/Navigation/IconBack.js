import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function IconBack() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 0, backgroundColor: "red" }}
    >
      <Ionicons name="arrow-back" size={24} color="#ffffff" />
    </TouchableOpacity>
  );
}
