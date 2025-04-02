import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: "80%",
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    backgroundColor: "#3d3d3d",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  body: {
    padding: 16,
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  dangerButton: {
    backgroundColor: "#dc3545",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
