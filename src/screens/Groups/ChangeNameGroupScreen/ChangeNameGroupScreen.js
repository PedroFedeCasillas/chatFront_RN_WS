import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { initialValues, validationSchema } from "./ChangeNameGroupScreen.form";
import { useFormik } from "formik";
import { Group } from "../../../api";
import { useAuth } from "../../../hooks";
import { styles } from "./ChangeNameGroupScreen.styles";

const groupController = new Group();

export function ChangeNameGroupScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(params.groupName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await groupController.update(accessToken, params.groupId, {
          name: formValue.name,
        });
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <TextInput
        placeholder="Nombre del grupo"
        placeholderTextColor="#888"
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        style={[styles.input, formik.errors.name && styles.inputError]}
      />
      <TouchableOpacity
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
        style={styles.btn}
      >
        <Text style={styles.textBtn}>Cambiar nombre</Text>
      </TouchableOpacity>
    </View>
  );
}
