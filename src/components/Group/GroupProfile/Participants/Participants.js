import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { size, map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { ENV, screens } from "../../../../utils";
import { useAuth } from "../../../../hooks";
import { Group } from "../../../../api";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "./Participants.styles";

const groupController = new Group();

export function Participants(props) {
  const navigation = useNavigation();
  const {
    group: { _id, participants },
    onReload,
  } = props;
  const { accessToken, user } = useAuth();

  const banFromGroup = async (participant) => {
    try {
      await groupController.ban(accessToken, _id, participant._id);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  const openAddParticipants = () => {
    navigation.navigate(screens.global.addUserGroupScreen, { groupId: _id });
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{size(participants)}Participantes</Text>
      <View style={styles.list}>
        <TouchableOpacity
          style={styles.participant}
          onPress={openAddParticipants}
        >
          <Avatar.Icon
            size={50}
            icon="plus"
            color="white"
            style={styles.addIcon}
          />
          <Text style={styles.addParticipant}>Añadir participantes</Text>
        </TouchableOpacity>
        {map(participants, (participant, index) => (
          <View key={index} style={styles.participant}>
            {participant.avatar ? (
              <Avatar.Image
                source={{ uri: `${ENV.BASE_PATH}/${participant.avatar}` }}
                size={40}
              />
            ) : (
              <Avatar.Text
                label={participant.email.substring(0, 2).toUpperCase()}
                size={40}
                labelStyle={styles.label}
                style={styles.addIcon}
              />
            )}

            <View style={styles.info}>
              <Text style={styles.identity}>
                {participant.firstname || participant.lastname
                  ? `${participant.firstname || ""} ${
                      participant.lastname || ""
                    }`
                  : "..."}
              </Text>
              <Text style={styles.email}>{participant.email} </Text>

              {participant._id !== user._id && (
                <TouchableOpacity
                  onPress={() => banFromGroup(participant)}
                  style={styles.banIcon}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="#06b6d4"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
