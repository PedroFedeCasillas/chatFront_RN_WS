import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  content: {
    backgroundColor: "#130057",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    position: "relative",
  },
  input: {
    backgroundColor: "#29292b",
    color: "#fff",
    fontSize: 16,
    borderRadius: 20,
    marginLeft: 15,
    // marginVertical: 5,
    paddingHorizontal: 15,
  },
  iconSend: {
    position: "absolute",
    top: 5,
    right: 10,
    height: "100%",
  },
});
