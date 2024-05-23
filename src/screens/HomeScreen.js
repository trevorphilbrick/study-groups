import { View, Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "../App";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const user = useContext(UserContext);
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: top,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text>{user.toString()}</Text>
    </View>
  );
};

export default HomeScreen;
