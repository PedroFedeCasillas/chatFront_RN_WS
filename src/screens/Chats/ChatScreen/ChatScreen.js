import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { HeaderChat } from "../../../components/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { ChatMessage, UnreadMessages } from "../../../api";
import { useAuth } from "../../../hooks";
import { LoadingScreen } from "../../../components/Shared";
import { ENV, socket } from "../../../utils";
import { ListMessages, ChatForm } from "../../../components/Chat";

const chatMessageController = new ChatMessage();
const unreadmessagesController = new UnreadMessages();

export function ChatScreen() {
  const {
    params: { chatId },
  } = useRoute();
  const { accessToken } = useAuth();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID, chatId);
      } catch (error) {
        console.error(error);
      }
    })();

    return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID);
    };
  }, [chatId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await chatMessageController.getAll(
          accessToken,
          chatId
        );
        setMessages(response.messages);
        unreadmessagesController.setTotalReadMessages(chatId, response.total);
      } catch (error) {
        console.error(error);
      }
    })();
    return async () => {
      const response = await chatMessageController.getAll(accessToken, chatId);
      unreadmessagesController.setTotalReadMessages(chatId, response.total);
    };
  }, [chatId]);

  useEffect(() => {
    socket.emit("subscribe", chatId);
    socket.on("message", newMessge);

    return () => {
      socket.emit("unsubscribe", chatId);
      socket.off("message", newMessge);
    };
  }, [chatId, messages]);

  const newMessge = (msg) => {
    setMessages([...messages, msg]);
  };

  if (!messages) return <LoadingScreen />;

  return (
    <>
      <View
        style={{
          //   height: 90,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#0891b2",
        }}
      >
        <HeaderChat chatId={chatId} />
      </View>

      <View>
        <ListMessages messages={messages} />
        <ChatForm chatId={chatId} />
      </View>
    </>
  );
}
