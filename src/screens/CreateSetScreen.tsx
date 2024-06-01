import { FlatList, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import NoteCardForm, { NoteCard } from "../components/NoteCardForm";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import firestore from "@react-native-firebase/firestore";
import { nanoid } from "nanoid/non-secure";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { MenuStackNavigation } from "../navigators/MenuNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addCardset } from "../api/addCardset";
import { updateCardSet } from "../api/updateCardSet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { theme } from "../constants/theme";

const CreateSetScreen = () => {
  const [cards, setCards] = useState<NoteCard[]>([]);
  const [cardSet, setCardSet] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigation = useNavigation<MenuStackNavigation>();
  const { bottom } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const updateCardSetMutation = useMutation({
    mutationFn: () => updateCardSet(cardSet, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cardSets"] });
      navigation.navigate("Home");
    },
  });

  const addCardSetMutation = useMutation({
    mutationFn: () => addCardset(cardSet, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cardSets"] });
      navigation.navigate("Home");
    },
  });

  const handleCreateSet = async () => {
    if (!name || !cards.length) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a name and at least one card",
      });
      return;
    }
    try {
      setLoading(true);
      setCardSet({
        name,
        description,
        cards,
        user: user.uid,
        timestamp: new Date().toISOString(),
        setId: nanoid(),
      });

      const documentRef = firestore()
        .collection("userCollections")
        .doc(user.uid);

      const docSnapshot = await documentRef.get();

      if (!docSnapshot.exists) {
        addCardSetMutation.mutate();
      } else {
        updateCardSetMutation.mutate();
      }
      setName("");
      setDescription("");
      setCards([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    // <ScrollView
    //   style={{
    //     paddingTop: 24,
    //     flex: 1,
    //     paddingHorizontal: 24,
    //   }}
    // >

    // </ScrollView>

    <FlatList
      ListHeaderComponent={
        <View style={{ paddingTop: 24, flex: 1, paddingHorizontal: 24 }}>
          <Text style={{ color: theme.colors.onPrimary }}>Card Set Name</Text>
          <TextInput
            placeholder="Enter set name"
            style={{ marginVertical: 16 }}
            value={name}
            onChangeText={(val) => setName(val)}
          />
          <Text
            style={{ color: theme.colors.onPrimary }}
          >{`Card Set Description (optional)`}</Text>
          <TextInput
            placeholder="Enter set description"
            style={{ marginVertical: 16 }}
            value={description}
            onChangeText={(val) => setDescription(val)}
          />
          <Text style={{ color: theme.colors.onPrimary }}>Note Cards</Text>
          <NoteCardForm setCards={setCards} setScreenLoading={setLoading} />
          <Button
            mode="contained"
            style={{ marginTop: 16, marginBottom: 24 }}
            buttonColor={theme.colors.secondary}
            onPress={() => handleCreateSet()}
            loading={loading}
            disabled={loading}
          >
            Create Set
          </Button>
        </View>
      }
      renderItem={({ item }) => (
        <View style={{ marginHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.onPrimary,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            {item.prompt}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.onPrimary,
            }}
          >
            {item.answer}
          </Text>
        </View>
      )}
      data={cards}
      keyExtractor={(item, index) => index.toString() + item.prompt}
      ItemSeparatorComponent={() => (
        <Divider style={{ marginVertical: 16, marginHorizontal: 24 }} />
      )}
      ListFooterComponent={<View style={{ height: bottom }} />}
    />
  );
};

export default CreateSetScreen;
