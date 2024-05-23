import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MenuNavigator from "./MenuNavigator";
import { useContext } from "react";
import { UserContext } from "../App";

const Root = createNativeStackNavigator();

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
