import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    marginBottom: 50,
    paddingBottom: 50,
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 10,
    alignItems: "center",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarImg: {
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    backgroundColor: "#0891b2",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 12,
  },
  name: {
    fontWeight: 600,
    color: "#fff",
    fontSize: 16,
  },
  email: {
    color: "#fff",
    opacity: 0.6,
    marginTop: 10,
  },
});
