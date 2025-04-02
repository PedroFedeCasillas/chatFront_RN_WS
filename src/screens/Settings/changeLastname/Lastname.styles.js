import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#3D3D3D",
    marginVertical: 5,
    fontSize: 18,
  },
  btn: {
    backgroundColor: "#1eadff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputError: {
    borderWidth: 2,
    borderColor: "#500000",
    marginBottom: 10,
  },
});
