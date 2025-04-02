import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { initialValues, validationSchema } from "./Lastname.form";
import { useFormik } from "formik";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Lastname.styles";

const userController = new User();

export function ChangeLastnaneScreen() {
  const navigation = useNavigation();
  const { accessToken, updateUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const dataUser = { lastname: formValue.lastname };
      await userController.updateUser(accessToken, dataUser);
      updateUser("lastname", formValue.lastname);
      navigation.goBack();
      try {
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <View style={styles.content}>
      <TextInput
        placeholder="Apellido"
        placeholderTextColor="#888"
        value={formik.values.lastname}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        style={[styles.input, formik.errors.lastname && styles.inputError]}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={formik.handleSubmit}
        isLoading={formik.isLoading}
      >
        <Text style={styles.textBtn}>Cambiar</Text>
      </TouchableOpacity>
    </View>
  );
}
