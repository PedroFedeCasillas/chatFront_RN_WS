import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "../../../api";
import { styles } from "./RegisterForm.styles";

const authController = new Auth();

export function RegisterForm() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authController.register(formValue.email, formValue.password);
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder="Correo electronico"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={formik.values.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          style={[styles.input, formik.errors.email && styles.inputError]}
          keyboardType="email-address"
        />
      </View>
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        style={[styles.input, formik.errors.password && styles.inputError]}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      >
        <Text style={styles.btnText}>CREAR CUENTA</Text>
      </TouchableOpacity>
    </View>
  );
}
