import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CreateSetScreen from "../screens/CreateSetScreen";
import { NavigationProp } from "@react-navigation/native";

export type ScreenNames = ["Home", "CreateNoteCardSet", "Login"]; // type these manually
export type ScreenProps = [undefined, undefined];
export type MenuStackParamList = Record<
  ScreenNames[number],
  ScreenProps[number]
>;
export type MenuStackNavigation = NavigationProp<MenuStackParamList>;

const Menu = createNativeStackNavigator<MenuStackParamList>();

const MenuNavigator = () => {
  return (
    <Menu.Navigator screenOptions={{ headerShown: false }}>
      <Menu.Screen name="Home" component={HomeScreen} />
      <Menu.Screen name="CreateNoteCardSet" component={CreateSetScreen} />
    </Menu.Navigator>
  );
};

export default MenuNavigator;
