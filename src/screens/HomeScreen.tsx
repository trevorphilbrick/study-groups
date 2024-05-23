import { View, Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "../App";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Card } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { setUser, user } = useContext(UserContext);
  const navigation = useNavigation();

  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: top,
        flex: 1,
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Text>Hello {user?.displayName}</Text>
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
          Sign out
        </Button>
      </View>
      <Card>
        <Card.Title title="Your Note Cards" />
        <Card.Content>
          <Text style={{ marginBottom: 8 }}>
            It doesn&apos;t look like you have any note card sets created yet...
          </Text>
          <Button onPress={() => navigation.navigate("CreateNoteCardSet")}>
            Create Note Card Set
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HomeScreen;
