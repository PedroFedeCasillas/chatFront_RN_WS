import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { size } from "lodash";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Chat } from "../../../api";
import { useAuth } from "../../../hooks";
import { LoadingScreen } from "../../../components/Shared";
import { ListChat, Search } from "../../../components/Chat";
import { screens } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ChatsScreen.styles";

const chatController = new Chat();

export function ChatsScreen() {
  const [chats, setChats] = useState(null);
  const [chatsResult, setChatsResult] = useState(null);
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          size={40}
          color="#0891b2"
          onPress={() => {
            navigation.navigate(screens.tab.chats.createChatScreen);
          }}
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await chatController.getAll(accessToken);

          const result = response.sort((a, b) => {
            return (
              new Date(b.last_message_date) - new Date(a.last_message_date)
            );
          });

          setChats(result);
          setChatsResult(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [reload])
  );

  const upTopChat = (chatId) => {
    const data = chatsResult;
    const formIndex = data.map((chat) => chat._id).indexOf(chatId);
    const toIndex = 0;

    const element = data.splice(formIndex, 1)[0];

    data.splice(toIndex, 0, element);
    setChats([...data]);
  };

  if (!chatsResult) return <LoadingScreen />;

  return (
    <View>
      <View style={styles.contentIcon}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.navigate(screens.tab.chats.createChatScreen)
          }
        >
          <Ionicons name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      {size(chats) > 0 && <Search data={chats} setData={setChatsResult} />}
      <ListChat
        chats={size(chats) === size(chatsResult) ? chats : chatsResult}
        onReload={onReload}
        upTopChat={upTopChat}
      />
    </View>
  );
}
