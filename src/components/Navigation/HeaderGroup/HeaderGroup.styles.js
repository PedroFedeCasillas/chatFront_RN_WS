import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  container: {
    backgroundColor: "#171717",
    height: 95,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    top: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    // top: 16,
    backgroundColor: "#0891b2",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    marginLeft: 30,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
