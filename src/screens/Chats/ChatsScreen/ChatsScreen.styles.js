import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
  containerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  floatingButton: {
    position: "absolute",
    top: 5,
    right: 60,
    backgroundColor: "#0891b2",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Sombra en Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 10, // Asegura que el botón esté encima de otros elementos
  },
});
