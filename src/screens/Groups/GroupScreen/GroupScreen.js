import { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupMessage, UnreadMessages } from "../../../api";
import { ENV, socket } from "../../../utils";
import { useAuth } from "../../../hooks";
import { HeaderGroup } from "../../../components/Navigation";
import { LoadingScreen } from "../../../components/Shared";
import { ListMessages, GroupForm } from "../../../components/Group";
import { styles } from "./GroupScreen.styles";

const groupMessageController = new GroupMessage();
const unreadMessageController = new UnreadMessages();

export function GroupScreen() {
  const navigation = useNavigation();
  const {
    params: { groupId },
  } = useRoute();
  const { accessToken } = useAuth();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(ENV.ACTIVE_GROUP_ID, groupId);
    })();

    return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_GROUP_ID);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await groupMessageController.getAll(
          accessToken,
          groupId
        );
        setMessages(response.messages);
        unreadMessageController.setTotalReadMessages(groupId, response.total);
      } catch (error) {
        console.error(error);
      }
    })();

    return async () => {
      const response = await groupMessageController.getAll(
        accessToken,
        groupId
      );
      unreadMessageController.setTotalReadMessages(groupId, response.total);
    };
  }, [groupId]);

  useEffect(() => {
    socket.emit("subscribe", groupId);
    socket.on("message", newMessge);

    return () => {
      socket.emit("unsubscribe", groupId);
      socket.off("message", newMessge);
    };
  }, [groupId, messages]);

  const newMessge = (msg) => {
    setMessages([...messages, msg]);
  };

  if (!messages) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <HeaderGroup groupId={groupId} />
      <ListMessages messages={messages} />
      <GroupForm groupId={groupId} />
    </View>
  );
}
