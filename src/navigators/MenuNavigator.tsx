import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CreateSetScreen from "../screens/CreateSetScreen";
import { NavigationProp } from "@react-navigation/native";
import CardViewerScreen from "../screens/CardViewerScreen";
import HomeScreenHeaderLeft from "../components/HomeScreenHeaderLeft";
import SignOutButton from "../components/SignOutButton";
import { theme } from "../constants/theme";
import React, { createContext, useState } from "react";

export type ScreenNames = ["Home", "CreateNoteCardSet", "Login", "CardViewer"]; // type these manually
export type ScreenProps = [
  undefined,
  undefined,
  undefined,
  {
    id: string;
    name?: string;
    description?: string;
    cards?: any[];
    timestamp?: number;
    user?: string;
  },
]; // type these manually
export type MenuStackParamList = Record<
  ScreenNames[number],
  ScreenProps[number]
>;
export type MenuStackNavigation = NavigationProp<MenuStackParamList>;

const Menu = createNativeStackNavigator<MenuStackParamList>();

export const CardViewerHeaderTitle = createContext<{
  headerTitle: string;
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
}>(undefined);

const MenuNavigator = () => {
  const [headerTitle, setHeaderTitle] = useState<string | undefined>(undefined);
  return (
    <CardViewerHeaderTitle.Provider value={{ headerTitle, setHeaderTitle }}>
      <Menu.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.onPrimary,
        }}
      >
        <Menu.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: HomeScreenHeaderLeft,
            headerRight: SignOutButton,
            headerTitle: "",
          }}
        />
        <Menu.Screen
          name="CreateNoteCardSet"
          component={CreateSetScreen}
          options={{ headerTitle: "Create Set" }}
        />
        <Menu.Screen
          name="CardViewer"
          component={CardViewerScreen}
          options={{ headerTitle: headerTitle }}
        />
      </Menu.Navigator>
    </CardViewerHeaderTitle.Provider>
  );
};

export default MenuNavigator;
