import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SettingsScreen,
  ChangeFirstnameScreen,
  ChangeLastnaneScreen,
} from "../../screens/Settings";
import { screens } from "../../utils";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function SettingsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...styles.stackNavigationStyles,
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name={screens.tab.settings.settingScreen}
        component={SettingsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={screens.tab.settings.changeFirstnameScreen}
        component={ChangeFirstnameScreen}
        options={{
          title: "Cambiar nombre",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name={screens.tab.settings.changeLastnameScreen}
        component={ChangeLastnaneScreen}
        options={{
          title: "Cambiar apellido",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
