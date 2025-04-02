import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../hooks";
import { User, Group } from "../../api";
import { Search, ListUserAddParticipants } from "../../components/Group";

const userController = new User();
const groupController = new Group();

export function AddUserGroupScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const { params } = useRoute();
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getUsersExceptParticipantsGroup(
          accessToken,
          params.groupId
        );
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const addParticipants = async (ids) => {
    try {
      await groupController.addParticipants(accessToken, params.groupId, ids);
      navigation.goBack();
      navigation.goBack();
      // console.log(selectedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {/* header aquí */}
      <Search data={users} setData={setUsersResult} />
      <ListUserAddParticipants
        users={usersResult}
        addParticipants={addParticipants}
      />
    </View>
  );
}
