import { View, Text, FlatList } from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Card } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { MenuStackNavigation } from "../navigators/MenuNavigator";
import { useQuery } from "@tanstack/react-query";
import { getCardSets } from "../api/getCardSets";
import CardSetContainer from "../components/CardSetContainer";

const HomeScreen = () => {
  const { setUser, user } = useContext(UserContext);
  const navigation = useNavigation<MenuStackNavigation>();
  const { top } = useSafeAreaInsets();

  const {
    data: cardSets,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["cardSets"],
    queryFn: () => getCardSets(user),
  });

  return (
    <View
      style={{
        marginTop: top,
        flex: 1,
        marginHorizontal: 24,
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Your Card Sets</Text>
        <Button onPress={() => navigation.navigate("CreateNoteCardSet")}>
          Create Note Card Set
        </Button>
      </View>
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error fetching card sets</Text>}
      {isSuccess && cardSets.length === 0 && (
        <Text style={{ marginBottom: 8 }}>
          It doesn&apos;t look like you have any note card sets created yet...
        </Text>
      )}
      {isSuccess && cardSets.length > 0 && (
        <FlatList
          data={cardSets}
          renderItem={({ item }) => <CardSetContainer item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default HomeScreen;
