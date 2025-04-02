import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  container: {
    position: "relative",
  },
  photo: {
    height: "100%",
    width: "100%",
  },

  topAction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    top: 50,
    left: 0,
    padding: 10,
  },
  icon: {
    color: "#fff",
  },
  bottomAction: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    width: "100%",
    bottom: 50,
    left: 0,
  },
});
