import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
  },
  topAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 50,
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    width: "100%",
    bottom: 50,
    left: 0,
    // padding: 10,
  },
  icon: {
    color: "#fff",
  },
  iconBackground: {
    backgroundColor: "#202020",
    borderRadius: 50,
    padding: 10,
  },
});
