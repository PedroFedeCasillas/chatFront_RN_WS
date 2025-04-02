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
    paddingHorizontal: 10,
  },
  avatar: {
    backgroundColor: "#06b6d4",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  selected: {
    backgroundColor: "#164e63",
  },
  info: {
    flex: 1,
    paddingHorizontal: 15,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  email: {
    color: "#fff",
    opacity: 0.4,
    marginTop: 5,
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
  },
  iconButton: {
    backgroundColor: "#0891b2",
    borderRadius: 50,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    zIndex: 1,
  },
});
