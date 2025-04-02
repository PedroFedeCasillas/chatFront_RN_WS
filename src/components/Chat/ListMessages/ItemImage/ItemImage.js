import React from "react";
import { View, Text, Pressable } from "react-native";
import { DateTime } from "luxon";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../../hooks";
import { styled } from "./ItemImage.styles";
import { ENV, screens } from "../../../../utils";

export function ItemImage(props) {
  const { message } = props;
  const { user } = useAuth();
  const isMe = user._id === message.user._id;
  const styles = styled(isMe);
  const createMessage = new Date(message.createdAt);
  const navigation = useNavigation();

  const imageUrl = `${ENV.BASE_PATH}/${message.message}`;

  const onOpenImage = () => {
    navigation.navigate(screens.global.imageFullScreen, { uri: imageUrl });
  };

  return (
    <View style={styles.content}>
      <View style={styles.message}>
        <Pressable onPress={onOpenImage}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="contain"
          />
        </Pressable>
        <Text style={styles.date}>
          {DateTime.fromISO(createMessage.toISOString()).toFormat("HH:mm")}
        </Text>
      </View>
    </View>
  );
}
