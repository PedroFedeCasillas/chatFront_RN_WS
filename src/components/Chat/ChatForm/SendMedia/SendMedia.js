import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GalleryOptions, CameraOptions } from "./Options";
import { useAuth } from "../../../../hooks";
import { styles } from "./SendMedia.styles";

export function SendMedia(props) {
  const { chatId } = props;
  const { accessToken } = useAuth();
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      {/* Botón para abrir el menú */}
      <TouchableOpacity onPress={onOpenClose} style={styles.addButton}>
        <Ionicons name="add" size={30} color="#0891b2" />
      </TouchableOpacity>

      {/* Modal para el Actionsheet */}
      <Modal
        transparent={true}
        visible={show}
        animationType="slide"
        onRequestClose={onOpenClose}
      >
        <View style={styles.overlay}>
          <View style={styles.actionsheet}>
            {/* Opciones del menú */}
            <TouchableOpacity style={styles.option}>
              <CameraOptions onClose={onOpenClose} chatId={chatId} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <GalleryOptions
                onClose={onOpenClose}
                chatId={chatId}
                accessToken={accessToken}
              />
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity
              style={[styles.option, styles.cancel]}
              onPress={onOpenClose}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
