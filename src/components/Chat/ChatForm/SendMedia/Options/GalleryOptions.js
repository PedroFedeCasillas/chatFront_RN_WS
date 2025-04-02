import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { ChatMessage } from "../../../../../api";
import { imageExpoFormat } from "../../../../../utils";
import { styles } from "../SendMedia.styles";

const chatMessageController = new ChatMessage();

export function GalleryOptions(props) {
  const { onClose, chatId, accessToken } = props;

  const openGalley = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      sendImage(result.assets[0].uri);
    }
  };

  const sendImage = async (uri) => {
    try {
      const file = imageExpoFormat(uri);
      await chatMessageController.sendImage(accessToken, chatId, file);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.optionGallery} onPress={openGalley}>
        <Ionicons name="images" size={40} color="#0891b2" />
        <Text style={styles.optionText}>Galeria</Text>
      </TouchableOpacity>
    </>
  );
}
