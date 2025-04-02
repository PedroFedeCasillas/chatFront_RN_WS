import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  content: {
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    padding: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 40,
  },
  avatarPlaceholder: {
    backgroundColor: "#ccc",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageGroup: {
    width: 80,
    height: 80,
    // marginTop: 20,
    // marginBottom: 40,
    borderWidth: 1,
    borderColor: "#fff",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },

  input: {
    backgroundColor: "#29292b",
    width: "100%",
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  btn: {
    backgroundColor: "#0891b2",
    width: "100%",
    marginTop: 20,
  },
  imageError: {
    borderWidth: 2,
    borderColor: "#f00",
  },
  inputError: {
    borderWidth: 2,
    borderColor: "#f00",
  },
});
