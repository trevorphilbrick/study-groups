import { Text } from "react-native";
import { UserContext } from "../App";
import { useContext } from "react";
import { theme } from "../constants/theme";

const HomeScreenHeaderLeft = () => {
  const { user } = useContext(UserContext);
  return (
    <Text style={{ color: theme.colors.onPrimary, fontSize: 16 }}>
      Hello, {user?.displayName}!
    </Text>
  );
};

export default HomeScreenHeaderLeft;
