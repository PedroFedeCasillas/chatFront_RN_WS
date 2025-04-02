import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map, size } from "lodash";
import { ENV } from "../../../../utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./ListUsers.styles";

export function ListUsers(props) {
  const { users, nextStep, setUsersId } = props;
  const [ids, setIds] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       if (size(ids) > 0) {
  //         return (
  //           <Button onPress={onNextStep}>
  //             <Ionicons name="checkmark-outline" size={30} color="#0891b2" />
  //           </Button>
  //         );
  //       }
  //       return null;
  //     },
  //   });
  // }, [ids, navigation]);

  const onNextStep = () => {
    setUsersId(ids);
    nextStep();
  };

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

  return (
    <>
      <View style={styles.contentHeader}>
        <TouchableOpacity style={styles.iconButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Nuevo Grupo</Text>

        {size(ids) > 0 && (
          <TouchableOpacity style={styles.iconButton} onPress={onNextStep}>
            <Ionicons name="checkmark-outline" size={30} color="#0891b2" />
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
                style={styles.avatar}
                source={{
                  uri: `${ENV.BASE_PATH}/${user.avatar}`,
                }}
                size={50}
              />
            ) : (
              <Avatar.Text
                label={
                  user.email ? user.email.substring(0, 2).toUpperCase() : "?"
                }
                size={50}
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
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
