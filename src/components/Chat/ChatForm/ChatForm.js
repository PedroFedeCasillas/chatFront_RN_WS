import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormik } from "formik";
import { ChatMessage } from "../../../api";
import { useAuth } from "../../../hooks";
import { SendMedia } from "./SendMedia";
import { initialValues, validationSchema } from "./ChatForm.form";
import { styles } from "./ChatForm.styles";

const chatMessageController = new ChatMessage();

export function ChatForm(props) {
  const { chatId } = props;
  const { accessToken } = useAuth();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  //* Solo funciona con ios
  useEffect(() => {
    const showKeyboardSub = Keyboard.addListener("keyboardDidShow", (e) => {
      const { startCoordinates } = e;
      if (Platform.OS === "ios") {
        setKeyboardHeight(startCoordinates.height + 65);
      }
    });

    const hideKeyboardSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showKeyboardSub.remove();
      hideKeyboardSub.remove();
    };
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        setKeyboardHeight(0);
        Keyboard.dismiss();

        await chatMessageController.sendText(
          accessToken,
          chatId,
          formValue.message
        );
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    // <View style={[styles.content, { bottom: keyboardHeight }]}>
    <View style={styles.content}>
      <SendMedia chatId={chatId} />

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
