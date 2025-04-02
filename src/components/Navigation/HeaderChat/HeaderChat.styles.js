import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  container: {
    backgroundColor: "#171717",
    // backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 45,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImg: {
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 14,
  },
  avatarText: {
    backgroundColor: "#0891b2",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 14,
  },
  identity: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
});
