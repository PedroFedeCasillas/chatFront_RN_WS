import { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Group } from "../../../api";
import { screens } from "../../../utils";
import { useAuth } from "../../../hooks";
import { Ionicons } from "@expo/vector-icons";
import { size } from "lodash";
import { Button } from "@react-navigation/elements";
import { LoadingScreen } from "../../../components/Shared";
import { ListGroups, Search } from "../../../components/Group";
import { styles } from "./GroupsScreen.styles";

const groupController = new Group();

export function GroupsScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [groups, setGroups] = useState(null);
  const [groupsResult, setGroupsResult] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            navigation.navigate(screens.tab.groups.createGroupScreen)
          }
        >
          <Ionicons name="close-outline" size={30} color="#0891b2" />
        </Button>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await groupController.getAll(accessToken);

          const result = response.sort((a, b) => {
            return (
              new Date(b.last_message_date) - new Date(a.last_message_date)
            );
          });
          setGroups(result);
          setGroupsResult(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [])
  );

  const upGroupChat = (groupId) => {
    const data = groupsResult;
    const formIndex = data.map((group) => group._id).indexOf(groupId);
    const toIndex = 0;
    const element = data.splice(formIndex, 1)[0];
    data.splice(toIndex, 0, element);
    setGroups([...data]);
  };

  if (!groupsResult) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <View style={styles.contentIcon}>
        <TouchableOpacity style={styles.iconButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={30} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.titleText}>Grupos</Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate(screens.tab.groups.createGroupScreen)
          }
        >
          <Ionicons name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
      {size(groups) > 0 && <Search data={groups} setData={setGroupsResult} />}
      <ListGroups
        groups={size(groups) === size(groupsResult) ? groups : groupsResult}
        upGroupChat={upGroupChat}
      />
    </View>
  );
}
