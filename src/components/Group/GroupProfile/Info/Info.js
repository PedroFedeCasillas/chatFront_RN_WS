import React from "react";
import { View, Text, Pressable } from "react-native";
import { Avatar, Icon } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { ENV, imageExpoFormat, screens } from "../../../../utils";
import { styles } from "./Info.styles";
import { Group } from "../../../../api";

const groupController = new Group();

export function Info(props) {
  const navigation = useNavigation();
  const { group, setGroup } = props;
  const { accessToken } = useAuth();

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      updateImage(result.assets[0].uri);
    }
  };

  const updateImage = async (uri) => {
    try {
      const file = imageExpoFormat(uri);
      const response = await groupController.update(accessToken, group._id, {
        file,
      });

      const newData = { ...group, image: response.image };
      setGroup(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const openChangeNameGroup = () => {
    navigation.navigate(screens.global.changeNameGroupScreen, {
      groupId: group._id,
      groupName: group.name,
    });
  };

  return (
    <View style={styles.content}>
      <Pressable onPress={openGallery}>
        <Avatar.Image
          source={{ uri: `${ENV.BASE_PATH}/${group.image}` }}
          size={90}
        />
      </Pressable>

      <Text style={styles.name} onPress={openChangeNameGroup}>
        {group.name}
        <Icon source="information" size={24} color="#888" />;
      </Text>
      <Text style={styles.type}>Grupo</Text>
    </View>
  );
}
