import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { useRoute } from "@react-navigation/native";
import { ENV } from "../../../utils";
import { styles } from "./UserProfileScreen.styles";

const userController = new User();

export function UserProfileScreen() {
  const [user, setUser] = useState(null);
  const { params } = useRoute();
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getUser(
          accessToken,
          params.userId
        );
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params.userId]);

  if (!user) return null;

  return (
    <View style={styles.content}>
      <View>
        {user.avatar ? (
          <Avatar.Image
            style={styles.avatarImg}
            source={{
              uri: `${ENV.BASE_PATH}/${user.avatar}`,
            }}
            size={100}
          />
        ) : (
          <Avatar.Text
            label={
              user.firstname
                ? user.firstname.substring(0, 2).toUpperCase()
                : user.email.substring(0, 2).toUpperCase()
            }
            size={100}
            style={styles.avatarText}
          />
        )}
      </View>
      {user.firstname || user.lastname ? (
        <Text style={styles.identity}>
          {`${user.firstname || ""} ${user.lastname || ""}`}
        </Text>
      ) : null}

      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}
