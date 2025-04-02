import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../../hooks";
import { isEmpty } from "lodash";
import { DateTime } from "luxon";
import { ENV, socket, screens } from "../../../../utils";
import { Chat, ChatMessage, UnreadMessages } from "../../../../api";
import { AlertConfirm } from "../../../../components/Shared";
import { styles } from "./Item.styles";

const chatController = new Chat();
const chatMessageController = new ChatMessage();
const unreadMessagesCntroller = new UnreadMessages();

export function Item(props) {
  const navigation = useNavigation();
  const { chat, onReload, upTopChat } = props;
  const { participant_one, participant_two } = chat;
  const { accessToken, user } = useAuth();
  const [lastMessage, setLastMessage] = useState(null);
  const [totalUnreadMessage, setTotalUnreadMessage] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const totalMessages = await chatMessageController.getTotal(
          accessToken,
          chat._id
        );

        const totalReadMessages =
          await unreadMessagesCntroller.getTotalReadmessage(chat._id);

        setTotalUnreadMessage(totalMessages - totalReadMessages);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [chat._id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await chatMessageController.getLastMessage(
          accessToken,
          chat._id
        );
        if (!isEmpty(response)) setLastMessage(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [chat._id]);

  const userChat =
    user._id === participant_one._id ? participant_two : participant_one;

  const openCloseDelete = () => setShowDelete((prevState) => !prevState);

  const openChat = () => {
    setTotalUnreadMessage(0);
    navigation.navigate(screens.global.chatScreen, { chatId: chat._id });
  };

  const deleteChat = async () => {
    try {
      await chatController.remove(accessToken, chat._id);
      openCloseDelete();
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.emit("subscribe", `${chat._id}_notify`);
    socket.on("message_notify", newMessage);
  }, []);

  const newMessage = async (newMessage) => {
    if (newMessage.chat === chat._id) {
      if (newMessage.user._id !== user._id) {
        upTopChat(newMessage.chat);
        setLastMessage(newMessage);

        const activeChatId = await AsyncStorage.getItem(ENV.ACTIVE_CHAT_ID);
        if (activeChatId !== newMessage.chat) {
          setTotalUnreadMessage((prevState) => prevState + 1);
        }
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={openChat}
        onLongPress={openCloseDelete}
        style={styles.contentItem}
      >
        <View>
          {userChat.avatar ? (
            <Avatar.Image
              style={styles.avatarImg}
              source={{
                uri: `${ENV.BASE_PATH}/${userChat.avatar}`,
              }}
              size={65}
            />
          ) : (
            <Avatar.Text
              label={
                userChat.email
                  ? userChat.email.substring(0, 2).toUpperCase()
                  : "?"
              }
              size={65}
              style={styles.avatarText}
            />
          )}
        </View>

        <View style={styles.infoContent}>
          <View style={styles.info}>
            <Text style={styles.identity}>
              {userChat.firstname || userChat.lastname
                ? `${userChat.firstname || ""} ${userChat.lastname || ""}`
                : userChat.email}
            </Text>
            <Text style={styles.message} numberOfLine={2}>
              {lastMessage?.message || ""}
            </Text>
          </View>

          <View style={styles.notify}>
            {lastMessage ? (
              <Text style={styles.time}>
                {DateTime.fromISO(
                  new Date(lastMessage.createdAt).toISOString()
                ).toFormat("HH:mm")}
              </Text>
            ) : null}

            {totalUnreadMessage ? (
              <View style={styles.totalUnreadContent}>
                <Text style={styles.totalUnread}>
                  {totalUnreadMessage < 99 ? totalUnreadMessage : "99+"}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <AlertConfirm
        show={showDelete}
        onClose={openCloseDelete}
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        title="Eliminar chat"
        message={`Estas seguro de que quieres eliminar el chat con ${userChat.email}?`}
        isDanger
      />
    </>
  );
}

//    >>>>>>  ``  <<<<< baktis
