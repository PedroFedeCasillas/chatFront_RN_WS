import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  content: {
    width: "100%",
    marginTop: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2b2929",
    borderRadius: 10,
    marginVertical: 10,
  },
  participant: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  addIcon: {
    backgroundColor: "#06b6d4",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  addParticipant: {
    color: "#06b6d4",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  info: {
    flex: 1,
    paddingHorizontal: 15,
  },
  identity: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "space-between",
  },
  email: {
    color: "#fff",
    opacity: 0.4,
    marginTop: 5,
  },
  banIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
  },
});
