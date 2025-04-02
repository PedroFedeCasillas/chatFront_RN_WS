import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./AlertConfirm.styles";

export function AlertConfirm(props) {
  const [loading, setLoading] = useState(false);
  const { show, onClose, textConfirm, onConfirm, title, message, isDanger } =
    props;

  const onConfirmWrapper = () => {
    setLoading(true);
    onConfirm();
  };

  return (
    <Modal visible={show} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.titleText}>{title || "AlertConfirm"}</Text>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, isDanger && styles.dangerButton]}
              onPress={onConfirmWrapper}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.confirmButtonText}>{textConfirm}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
