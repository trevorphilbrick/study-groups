import React from "react";
import { Button, Text } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { UserContext } from "../App";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MenuStackNavigation } from "../navigators/MenuNavigator";
import { theme } from "../constants/theme";

const SignOutButton = () => {
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation<MenuStackNavigation>();

  return (
    <Button
      onPress={() =>
        auth()
          .signOut()
          .then(() => {
            setUser(null);
            navigation.navigate("Login");
          })
      }
    >
      <Text
        style={{
          fontSize: 16,
          color: theme.colors.onPrimary,
          fontWeight: "bold",
        }}
      >
        Sign Out
      </Text>
    </Button>
  );
};

export default SignOutButton;
