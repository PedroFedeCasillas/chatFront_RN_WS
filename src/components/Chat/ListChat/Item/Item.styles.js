import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  contentItem: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
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
  infoContent: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 10,
    justifyContent: "space-between",
    height: "100%",
  },
  info: {
    flex: 1,
  },
  identity: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    color: "#fff",
    opacity: 0.4,
    fontSize: 15,
  },
  notify: {
    alignItems: "flex-end",
  },
  time: {
    opacity: 0.6,
    color: "#fff",
    fontSize: 12,
    marginBottom: 5,
  },
  totalUnreadContent: {
    backgroundColor: "#06b6d4",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 19,
    height: 19,
  },
  totalUnread: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
});
