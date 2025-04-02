import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { isEmpty } from "lodash";
import { DateTime } from "luxon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupMessage, UnreadMessages } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV, screens, socket } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Item.styles";

const groupMessageController = new GroupMessage();
const unreadMessagesController = new UnreadMessages();

export function Item(props) {
  const navigation = useNavigation();
  const { group, upGroupChat } = props;
  const { accessToken, user } = useAuth();
  const [totalUreadMessages, setTotalUreadMessages] = useState(0);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const totalMessages = await groupMessageController.getTotal(
          accessToken,
          group._id
        );

        const totalReadMessages =
          await unreadMessagesController.getTotalReadmessage(group._id);

        setTotalUreadMessages(totalMessages - totalReadMessages);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [group._id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await groupMessageController.getLastMessage(
          accessToken,
          group._id
        );
        if (!isEmpty(response)) setLastMessage(response);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [group._id]);

  useEffect(() => {
    socket.emit("subscribe", `${group._id}_notify`);
    socket.on("message_notify", newMessage);
  }, []);

  const newMessage = async (newMsg) => {
    if (newMsg.group === group._id) {
      if (newMsg.user._id !== user._id) {
        upGroupChat(newMsg.group);
        setLastMessage(newMsg);

        const activeGroupId = await AsyncStorage.getItem(ENV.ACTIVE_GROUP_ID);
        if (activeGroupId !== newMsg.group) {
          setTotalUreadMessages((prevState) => prevState + 1);
        }
        // console.log(newMsg);
      }
    }
  };

  const openGroup = () => {
    setTotalUreadMessages(0);
    navigation.navigate(screens.global.groupScreen, { groupId: group._id });
    // console.log(group._id);
  };

  return (
    <TouchableOpacity style={styles.content} onPress={openGroup}>
      <Avatar.Image
        source={{ uri: `${ENV.BASE_PATH}/${group.image}` }}
        style={styles.avatar}
      />
      <View style={styles.infoContent}>
        <View style={styles.info}>
          <Text style={styles.identity}>{group.name}</Text>

          <Text style={styles.message} numberOfLines={2}>
            <Text style={styles.userName}>
              {lastMessage
                ? `${lastMessage.user?.firstname || lastMessage.user.email}: `
                : " "}
            </Text>
            <Text style={styles.textInfo}>
              {lastMessage ? lastMessage.message : " "}
            </Text>
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

          {totalUreadMessages ? (
            <View style={styles.totalUnreadContent}>
              <Text style={styles.totalUnread}>
                {totalUreadMessages < 99 ? totalUreadMessages : 99}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
