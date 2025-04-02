import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ChatsNavigation,
  GroupsNavigation,
  SettingsNavigation,
} from "../stacks";
import { screens } from "../../utils";
import { styles } from "./BottomTabNavigation.styles";

const Tab = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarInactiveTintColor: "#646464",
        tabBarActiveTintColor: "#0891b2",
        tabBarIcon: ({ color, size }) => screenIcon(route, color, size),
      })}
    >
      <Tab.Screen
        name={screens.tab.chats.root}
        component={ChatsNavigation}
        options={{ title: "Chats" }}
      />

      <Tab.Screen
        name={screens.tab.groups.root}
        component={GroupsNavigation}
        options={{ title: "Grupos" }}
      />

      <Tab.Screen
        name={screens.tab.settings.root}
        component={SettingsNavigation}
        options={{ title: "Ajustes" }}
      />
    </Tab.Navigator>
  );
}

function screenIcon(route, color, size) {
  let iconName;

  switch (route.name) {
    case screens.tab.chats.root:
      iconName = "chat";
      break;
    case screens.tab.groups.root:
      iconName = "account-group";
      break;
    case screens.tab.settings.root:
      iconName = "cog";
      break;
    default:
      iconName = "help-circle";
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
}
