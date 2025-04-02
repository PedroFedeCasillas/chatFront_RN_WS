import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { initialValues, validationSchema } from "./Firstname.form";
import { useFormik } from "formik";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Firstname.styles";

const userController = new User();

export function ChangeFirstnameScreen() {
  const navigation = useNavigation();
  const { accessToken, updateUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const dataUser = { firstname: formValue.firstname };
      await userController.updateUser(accessToken, dataUser);
      updateUser("firstname", formValue.firstname);
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
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={formik.values.firstname}
        onChangeText={(text) => formik.setFieldValue("firstname", text)}
        style={[styles.input, formik.errors.firstname && styles.inputError]}
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
