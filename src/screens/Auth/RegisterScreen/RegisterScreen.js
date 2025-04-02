import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./RegisterScreen.styles";
import { RegisterForm } from "../../../components/Auth";

export const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <Text style={styles.title}>
        Crea tu cuente y empieza a enviar mensajes
      </Text>

      <RegisterForm />

      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.register}>Iniciar sesiòn</Text>
      </TouchableOpacity>
    </View>
  );
};
