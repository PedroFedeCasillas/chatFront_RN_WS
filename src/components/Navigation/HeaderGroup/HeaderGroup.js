import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Group } from "../../../api";
import { useAuth } from "../../../hooks";
import { ENV, screens } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HeaderGroup.styles";

const groupController = new Group();

export function HeaderGroup(props) {
  const navigation = useNavigation();
  const { groupId } = props;
  const { accessToken } = useAuth();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await groupController.obtain(accessToken, groupId);
        setGroup(response);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [groupId]);

  const goToGroupProfile = () => {
    navigation.navigate(screens.global.groupProfileScreen, { groupId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.info}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={navigation.goBack}
          >
            <Ionicons name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>

          {group && (
            <Pressable onPress={goToGroupProfile} style={styles.info}>
              <Avatar.Image
                source={{ uri: `${ENV.BASE_PATH}/${group.image}` }}
                style={styles.avatar}
                size={40}
              />
              <Text style={styles.name}>{group.name}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
