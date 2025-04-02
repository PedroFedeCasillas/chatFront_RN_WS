import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { CreateChat, Search } from "../../../components/Chat";

const useController = new User();

export function CreateChatScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={50} color="#0891b2" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const response = await useController.getAll(accessToken);
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!usersResult) return null;

  return (
    <View>
      <Search data={users} setData={setUsersResult} />
      <CreateChat.ListUser users={usersResult} />
    </View>
  );
}
