import { useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Group } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { imageExpoFormat } from "../../../../utils";
import { initialValues, validationSchema } from "./Form.form";
import { styles } from "./Form.styles";

const groupController = new Group();

export function Form(props) {
  const { usersId } = props;
  const navigation = useNavigation();
  const { accessToken, user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { name, image } = formValue;
        await groupController.create(
          accessToken,
          user._id,
          usersId,
          name,
          image
        );

        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const openGalley = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const file = imageExpoFormat(result.assets[0].uri);
      formik.setFieldValue("image", file);
    }
  };

  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={openGalley} style={styles.avatarWrapper}>
        {formik.values.image?.uri ? (
          <Avatar.Image
            source={{ uri: formik.values.image.uri }}
            style={[
              styles.imageGroup,
              formik.errors.image && styles.imageError,
            ]}
            size={80}
          />
        ) : (
          <Avatar.Icon
            icon="camera"
            size={80}
            color="#fff"
            style={[
              styles.avatarPlaceholder,
              formik.errors.image && styles.imageError,
            ]}
          />
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Nombre del grupo"
        placeholderTextColor="#888"
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        style={[styles.input, formik.errors.name && styles.inputError]}
      />

      <Button mode="contained" style={styles.btn} onPress={formik.handleSubmit}>
        Subir
      </Button>
    </View>
  );
}
