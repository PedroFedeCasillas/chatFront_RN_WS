import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Group } from "../../../api";
import { useAuth } from "../../../hooks";
import { GroupProfile } from "../../../components/Group";
import { LoadingScreen } from "../../../components/Shared";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./GroupProfileScreen.styles";

const groupController = new Group();

export function GroupProfileScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { accessToken } = useAuth();
  const [group, setGroup] = useState(null);
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await groupController.obtain(
          accessToken,
          params.groupId
        );
        setGroup(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params.groupId, reload]);

  const exitGroup = async () => {
    try {
      await groupController.exit(accessToken, params.groupId);
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (!group) return <LoadingScreen />;

  return (
    <ScrollView style={styles.content}>
      <GroupProfile.Info group={group} setGroup={setGroup} />
      <GroupProfile.Participants group={group} onReload={onReload} />

      <View style={styles.actionContent}>
        <TouchableOpacity style={styles.btn} onPress={exitGroup}>
          <Text style={styles.textBtn}>Salir del grupo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
