import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

const Menu = createNativeStackNavigator();

const MenuNavigator = () => {
  return (
    <Menu.Navigator screenOptions={{ headerShown: false }}>
      <Menu.Screen name="Home" component={HomeScreen} />
    </Menu.Navigator>
  );
};

export default MenuNavigator;
