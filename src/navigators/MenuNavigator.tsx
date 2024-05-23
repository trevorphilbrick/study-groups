import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CreateSetScreen from "../screens/CreateSetScreen";

const Menu = createNativeStackNavigator();

const MenuNavigator = () => {
  return (
    <Menu.Navigator screenOptions={{ headerShown: false }}>
      <Menu.Screen name="Home" component={HomeScreen} />
      <Menu.Screen name="CreateNoteCardSet" component={CreateSetScreen} />
    </Menu.Navigator>
  );
};

export default MenuNavigator;
