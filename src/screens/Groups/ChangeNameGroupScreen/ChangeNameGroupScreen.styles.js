import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  content: {
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: "#202020",
    width: "100%",
    color: "#fff",
    fontSize: 18,
    marginVertical: 9,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  btn: {
    backgroundColor: "#2a86f7",
    width: "100%",
    borderRadius: 5,
  },
  textBtn: {
    color: "#fff",
    paddingVertical: 8,
    textAlign: "center",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#d30e0e",
  },
});
