import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  contentAvatar: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  avatar: {
    backgroundColor: "#06b6d4",
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  identity: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  email: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.6,
  },
});
