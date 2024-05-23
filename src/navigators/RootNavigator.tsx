import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MenuNavigator from "./MenuNavigator";
import { useContext } from "react";
import { UserContext } from "../App";

export type ScreenNames = ["Menu", "Auth"]; // type these manually
export type ScreenProps = [undefined, undefined];
export type RootStackParamList = Record<
  ScreenNames[number],
  ScreenProps[number]
>;

const Root = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user } = useContext(UserContext);
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "Menu" : "Auth"}
    >
      <Root.Screen name="Auth" component={AuthNavigator} />
      {user && <Root.Screen name="Menu" component={MenuNavigator} />}
    </Root.Navigator>
  );
};

export default RootNavigator;
