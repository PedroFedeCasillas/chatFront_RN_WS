import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { map } from "lodash";
import { Chat } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { styles } from "./ListUsers.styles";

const chatController = new Chat();

export function ListUser(props) {
  const { users } = props;
  const auth = useAuth();
  const navigation = useNavigation();

  const createChat = async (user) => {
    try {
      await chatController.create(auth.accessToken, auth.user._id, user._id);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener las iniciales del email
  const getInitials = (email) => {
    const [firstPart] = email.split("@");
    return firstPart.slice(0, 2).toUpperCase();
  };

  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {map(users, (user) => {
        const avatarUri = user.avatar
          ? `${ENV.BASE_PATH}/${user.avatar}`
          : null;
        return (
          <TouchableOpacity
            key={user._id}
            style={styles.item}
            onPress={() => createChat(user)}
          >
            <View style={styles.contentAvatar}>
              {avatarUri ? (
                <Avatar.Image
                  style={styles.avatarImg}
                  source={{ uri: avatarUri }}
                  size={65}
                />
              ) : (
                <Avatar.Text
                  label={getInitials(user.email)}
                  size={65}
                  style={styles.avatarText}
                />
              )}
            </View>

            <View>
              <Text style={styles.name}>
                {user.firstname || user.lastname
                  ? `${user.firstname || ""} ${user.lastname || ""}`
                  : "..."}
              </Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
