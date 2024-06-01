import { View, Text, FlatList } from "react-native";
import { useContext } from "react";
import { UserContext } from "../App";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MenuStackNavigation } from "../navigators/MenuNavigator";
import { useQuery } from "@tanstack/react-query";
import { getCardSets } from "../api/getCardSets";
import CardSetContainer from "../components/CardSetContainer";
import { theme } from "../constants/theme";
import { queryClient } from "../queryClient";

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation<MenuStackNavigation>();

  const {
    data: cardSets,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["cardSets", user],
    queryFn: () => getCardSets(user),
  });

  return (
    <View
      style={{
        marginTop: 16,
        flex: 1,
        marginHorizontal: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 24,
        }}
      >
        <Text style={{ color: theme.colors.onPrimary, fontSize: 24 }}>
          Your Sets
        </Text>
        <Button
          onPress={() => navigation.navigate("CreateNoteCardSet")}
          mode="contained"
          buttonColor={theme.colors.secondary}
          icon={"plus"}
        >
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Create Note Card Set
          </Text>
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
          data={queryClient.getQueryData(["cardSets", user])}
          renderItem={({ item }) => (
            <CardSetContainer item={item} key={item.id} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default HomeScreen;
