import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ChatMessage, GroupMessage } from "../../../api";
import { useAuth } from "../../../hooks";
import { imageExpoFormat } from "../../../utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "./PhotoCapture.styles";

const chatMessaggeController = new ChatMessage();
const groupMessageController = new GroupMessage();

export function PhotoCapture(props) {
  const { photo, type, id } = props;
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const sendMedia = async () => {
    try {
      setLoading(true);

      const file = imageExpoFormat(photo.uri);

      if (type === "chat") {
        await chatMessaggeController.sendImage(accessToken, id, file);
      }

      if (type === "group") {
        await groupMessageController.sendImage(accessToken, id, file);
      }

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} alt="photo" style={styles.photo} />

      <View style={styles.topAction}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={50} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomAction}>
        <TouchableOpacity onPress={sendMedia}>
          {loading ? (
            <ActivityIndicator animating={true} size="large" color="#0891b2" />
          ) : (
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={80}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
