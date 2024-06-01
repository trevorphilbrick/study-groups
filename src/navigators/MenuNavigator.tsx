import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CreateSetScreen from "../screens/CreateSetScreen";
import { NavigationProp } from "@react-navigation/native";
import CardViewerScreen from "../screens/CardViewerScreen";
import HomeScreenHeaderLeft from "../components/HomeScreenHeaderLeft";
import SignOutButton from "../components/SignOutButton";
import { theme } from "../constants/theme";

export type ScreenNames = ["Home", "CreateNoteCardSet", "Login", "CardViewer"]; // type these manually
export type ScreenProps = [undefined, undefined, undefined, { id: string }]; // type these manually
export type MenuStackParamList = Record<
  ScreenNames[number],
  ScreenProps[number]
>;
export type MenuStackNavigation = NavigationProp<MenuStackParamList>;

const Menu = createNativeStackNavigator<MenuStackParamList>();

const MenuNavigator = () => {
  return (
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
      <Menu.Screen name="CardViewer" component={CardViewerScreen} />
    </Menu.Navigator>
  );
};

export default MenuNavigator;
