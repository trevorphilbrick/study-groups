import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MenuNavigator from "./MenuNavigator";

const Root = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      <Root.Screen name="Auth" component={AuthNavigator} />
      <Root.Screen name="Menu" component={MenuNavigator} />
    </Root.Navigator>
  );
};

export default RootNavigator;
