import React from "react";
import { View, Text, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { ENV } from "../../../utils";
import { styles } from "./UserInfo.styles";

export function UserInfo(props) {
  const { user } = props;
  const avatarUri = user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : null;
  return (
    <View style={styles.content}>
      <View style={styles.contentAvatar}>
        {avatarUri ? (
          <Avatar.Image
            source={{ uri: avatarUri }}
            style={styles.avatar}
            size={100}
          />
        ) : (
          <Avatar.Text
            label={user?.email?.substring(0, 2).toUpperCase() || "NA"}
            style={styles.avatar}
            labelStyle={styles.label}
            size={100}
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
