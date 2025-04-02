import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useFormik } from "formik";
import { Auth } from "../../../api";
import { useAuth } from "../../../hooks";
import { styles } from "./LoginForm.styles";

const authController = new Auth();

export function LoginForm() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(
          formValue.email,
          formValue.password
        );

        const { access, refresh } = response;

        await authController.setAccesstoken(access);
        await authController.setRefreshToken(refresh);

        await login(access);
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
        <Text style={styles.btnText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
