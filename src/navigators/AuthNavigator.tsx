import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { NavigationProp } from "@react-navigation/native";

export type ScreenNames = ["Login", "Register", "Menu"]; // type these manually
export type ScreenProps = [undefined, undefined, { screen: "Home" }];
export type AuthStackParamList = Record<
  ScreenNames[number],
  ScreenProps[number]
>;
export type AuthStackNavigation = NavigationProp<AuthStackParamList>;

const Auth = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
    </Auth.Navigator>
  );
};

export default AuthNavigator;
