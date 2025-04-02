import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Chat } from "../../../api";
import { useAuth } from "../../../hooks";
import { ENV, screens } from "../../../utils";
import { AlertConfirm } from "../../Shared";
import { styles } from "./HeaderChat.styles";

const chatController = new Chat();

export function HeaderChat(props) {
  const navigation = useNavigation();
  const [showDelete, setShowDelete] = useState(false);
  const { chatId } = props;
  const { accessToken, user } = useAuth();
  const [userChat, setUserChat] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await chatController.obtain(accessToken, chatId);
        const otherUser =
          user._id !== response.participant_one._id
            ? response.participant_one
            : response.participant_two;
        setUserChat(otherUser);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [chatId]);

  const openCloseDelete = () => setShowDelete((prevState) => !prevState);

  const deleteChat = async () => {
    try {
      await chatController.remove(accessToken, chatId);
      navigation.goBack();
      openCloseDelete();
    } catch (error) {
      console.error(error);
    }
  };

  const goToUserProfile = () => {
    navigation.navigate(screens.global.userProfileScreen, {
      userId: userChat._id,
    });
  };

  return (
    <>
      <SafeAreaView sytle={styles.container}>
        <View style={styles.content}>
          <View style={styles.info}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ padding: 0 }}
            >
              <Ionicons name="arrow-back" size={30} color="#0891b2" />
            </TouchableOpacity>
            {userChat && (
              <Pressable onPress={goToUserProfile} style={styles.info}>
                <View>
                  {userChat.avatar ? (
                    <Avatar.Image
                      style={styles.avatarImg}
                      source={{
                        uri: `${ENV.BASE_PATH}/${userChat.avatar}`,
                      }}
                      size={40}
                    />
                  ) : (
                    <Avatar.Text
                      label={
                        userChat.firstname
                          ? userChat.firstname.substring(0, 2).toUpperCase()
                          : userChat.email.substring(0, 2).toUpperCase()
                      }
                      size={40}
                      style={styles.avatarText}
                    />
                  )}
                </View>
                <Text style={styles.identity}>
                  {userChat.firstname || userChat.lastname
                    ? `${userChat.firstname || ""} ${userChat.lastname || ""}`
                    : userChat.email}
                </Text>
              </Pressable>
            )}
          </View>
          <View>
            <TouchableOpacity style={{ padding: 0 }} onPress={openCloseDelete}>
              <MaterialCommunityIcons
                name="delete-forever"
                size={30}
                color="#0891b2"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <AlertConfirm
        show={showDelete}
        onClose={openCloseDelete}
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        title="Eliminar chat"
        message="Estas seguro de que quieres eliminar el chat"
        isDanger
      />
    </>
  );
}
