import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  contentIcon: {
    height: 90,
    backgroundColor: "#171717",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  titleText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    top: 16,
  },
  iconButton: {
    top: 16,
    backgroundColor: "#0891b2",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
