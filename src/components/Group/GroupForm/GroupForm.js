import { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks";
import { GroupMessage } from "../../../api";
import { SendMedia } from "./SendMedia";
import { initialValues, validationSchema } from "./GroupForm.form";
import { styles } from "./GroupForm.styles";

const groupMessageController = new GroupMessage();

export function GroupForm(props) {
  const { groupId } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        // setKeyboardHeight(0);
        // Keyboard.dismiss();

        await groupMessageController.sendText(
          accessToken,
          groupId,
          formValue.message
        );
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <SendMedia groupId={groupId} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enviar un mensage"
          placeholderTextColor="#888"
          value={formik.values.message}
          onChangeText={(text) => formik.setFieldValue("message", text)}
          style={styles.input}
          onEndEditing={() => {
            if (!formik.isSubmitting) {
              formik.handleSubmit();
            }
          }}
        />

        <TouchableOpacity
          style={styles.iconSend}
          onPress={() => {
            if (!formik.isSubmitting) {
              formik.handleSubmit();
            }
          }}
        >
          <MaterialCommunityIcons name="send" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
