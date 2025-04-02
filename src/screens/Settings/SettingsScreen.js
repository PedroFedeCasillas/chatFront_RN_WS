import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../hooks";
import { UserInfo, Options } from "../../components/Settings";

export function SettingsScreen() {
  const { user, accessToken, logout, updateUser } = useAuth();
  return (
    <SafeAreaView>
      <UserInfo user={user} />
      <Options
        accessToken={accessToken}
        logout={logout}
        updateUser={updateUser}
      />
      {/* <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SettingsScreen</Text>
      </View> */}
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    padding: 100,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },

  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
