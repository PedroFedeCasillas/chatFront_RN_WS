import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  content: {
    paddingHorizontal: 0,
    // marginHorizontal: 10,
    // paddingBottom: 10,
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#164e63",
  },
  avatar: {
    backgroundColor: "#06b6d4",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  info: {
    paddingHorizontal: 10,
  },

  name: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  email: {
    color: "#fff",
    opacity: 0.6,
    marginTop: 2,
  },
  //* >>>>>>>>>>>>>>>>estilos header<<<<<<<<<<<<<
  contentHeader: {
    height: 90,
    backgroundColor: "#888",
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
    // backgroundColor: "#0891b2",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
