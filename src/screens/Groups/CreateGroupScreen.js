import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { CreateGrupo, Search } from "../../components/Group";
import { Ionicons } from "@expo/vector-icons";

const userController = new User();

export function CreateGroupScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);
  const [step, setStep] = useState(1);
  const [usersId, setUsersId] = useState([]);

  console.log(usersId);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack}>
          <Ionicons name="close-outline" size={40} color="#0891b2" />
        </TouchableOpacity>
      ),
    });
  }, [step]);

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getAll(accessToken);
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const nextStep = () => setStep((prevState) => prevState + 1);

  if (!usersResult) return null;

  return (
    <View style={{ marginTop: 50 }}>
      {step === 1 && (
        <>
          {/* Buscador de usuarios */}

          <Search data={users} setData={setUsersResult} />

          <CreateGrupo.ListUsers
            users={usersResult}
            nextStep={nextStep}
            setUsersId={setUsersId}
          />
        </>
      )}
      {step === 2 && <CreateGrupo.Form usersId={usersId} />}
    </View>
  );
}
