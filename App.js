import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HandlerNavigation } from "./src/navigations/index.js";
import { AuthProvider } from "./src/contexts";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <AuthProvider>
            <HandlerNavigation />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
