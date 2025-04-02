import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../../../utils";
import { styles } from "../SendMedia.styles";

export function CameraOptions(props) {
  const { onClose, groupId } = props;
  const navigation = useNavigation();

  const openCamera = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.error(
          "No se han otorgado los permisos para acceder a la cámara."
        );
        Alert.alert(
          "Permiso denegado",
          "Se requieren permisos de cámara para usar esta función."
        );
        return;
      }

      onClose();
      navigation.navigate(screens.global.cameraScreen, {
        type: "group",
        id: groupId,
      });
    } catch (error) {
      console.error("Error al solicitar permisos de cámara:", error);
      Alert.alert("Error", "Ocurrió un error al acceder a la cámara.");
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.optionCamera} onPress={openCamera}>
        <Ionicons name="camera" size={40} color="#0891b2" />
        <Text style={styles.optionText}>Cámara</Text>
      </TouchableOpacity>
    </View>
  );
}
