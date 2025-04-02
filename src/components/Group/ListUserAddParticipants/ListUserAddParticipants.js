import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map, size } from "lodash";
import { ENV } from "../../../utils";
import { useAuth } from "../../../hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./ListUserAddParticipants.styles";

export function ListUserAddParticipants(props) {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const { users, addParticipants } = props;
  const [ids, setIds] = useState([]);

  //   useEffect(() => {
  //     first;

  //     return () => {
  //       second;
  //     };
  //   }, [ids]);

  const selectedUnselectdUser = (user) => {
    const isFound = ids.includes(user._id);

    if (isFound) {
      const newArray = ids.filter((userId) => userId !== user._id);
      setIds(newArray);
    } else {
      setIds((prevState) => [...prevState, user._id]);
    }
  };

  const isSelectedUser = (userId) => {
    return ids.includes(userId);
  };

  const onAddParticipants = () => {
    addParticipants(ids);
  };

  return (
    <>
      {/* header */}
      <View style={styles.contentHeaders}>
        {/* <TouchableOpacity style={styles.iconButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Añadir participantes</Text> */}

        {size(ids) > 0 && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onAddParticipants}
          >
            <Text style={styles.titleText}>Añadir </Text>
            {/* <Ionicons name="checkmark-outline" size={30} color="#0891b2" /> */}
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {map(users, (user) => (
          <TouchableOpacity
            key={user._id}
            onPress={() => selectedUnselectdUser(user)}
            style={[styles.item, isSelectedUser(user._id) && styles.selected]}
          >
            {user.avatar ? (
              <Avatar.Image
                source={{ uri: `${ENV.BASE_PATH}/${user.avatar}` }}
                size={40}
              />
            ) : (
              <Avatar.Text
                label={user.email.substring(0, 2).toUpperCase()}
                size={40}
                labelStyle={styles.label}
                style={styles.avatar}
              />
            )}

            <View style={styles.info}>
              <Text style={styles.name}>
                {user.firstname || user.lastname
                  ? `${user.firstname || ""} ${user.lastname || ""}`
                  : "..."}
              </Text>
              <Text style={styles.email}> {user.email} </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
