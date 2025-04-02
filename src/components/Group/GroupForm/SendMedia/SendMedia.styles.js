import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  addButton: {
    padding: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  actionsheet: {
    backgroundColor: "#3d3d3d",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
  },
  option: {
    paddingVertical: 15,
    alignItems: "center",
  },
  optionCamera: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionGallery: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 10,
  },
  cancel: {
    marginTop: 10,
  },
  cancelText: {
    fontSize: 18,
    color: "red",
  },
});
