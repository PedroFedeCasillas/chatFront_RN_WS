import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatsScreen, CreateChatScreen } from "../../screens/Chats";
import { screens } from "../../utils";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function ChatsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...styles.stackNavigationStyles,
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name={screens.tab.chats.chatsScreen}
        component={ChatsScreen}
        options={{
          title: "Chats",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name={screens.tab.chats.createChatScreen}
        component={CreateChatScreen}
        options={{
          title: "Nuevo chat",
          headerTitleAlign: "center",
          presentation: "modal",
          animation: "slide_from_bottom",
          ...styles.modalStyles,
        }}
      />
    </Stack.Navigator>
  );
}
