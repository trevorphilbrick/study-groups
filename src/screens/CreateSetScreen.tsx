import { FlatList, View, Text } from "react-native";
import { Button, Divider, TextInput } from "react-native-paper";
import NoteCardForm, { NoteCard } from "../components/NoteCardForm";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import firestore from "@react-native-firebase/firestore";
import { nanoid } from "nanoid/non-secure";
import Toast from "react-native-toast-message";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  MenuStackNavigation,
  MenuStackParamList,
} from "../navigators/MenuNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addCardset } from "../api/addCardset";
import { updateCardSets } from "../api/updateCardSets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { theme } from "../constants/theme";
import CardContainer from "../components/CardContainer";
import { updateCardSet } from "../api/updateCardSet";

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
  const { params } =
    useRoute<RouteProp<MenuStackParamList, "CreateNoteCardSet">>();

  const updateCardSetsMutation = useMutation({
    mutationFn: () => updateCardSets(cardSet, user),
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

  const updateCardSetMutation = useMutation({
    mutationFn: () => updateCardSet(cardSet, user),
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
        updateCardSetsMutation.mutate();
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

  const updateSet = async () => {
    try {
      setLoading(true);
      setCardSet({
        name,
        description,
        cards,
        user: user.uid,
        timestamp: new Date().toISOString(),
        setId: cardSet.setId,
      });

      updateCardSetMutation.mutate(cardSet, user);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (params) {
      setCardSet(params);
      setName(params.name);
      setDescription(params.description);
      setCards(params.cards);
    }
  }, [params]);

  return (
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
            onPress={() => {
              params ? updateSet() : handleCreateSet();
            }}
            loading={loading}
            disabled={loading}
          >
            {params ? "Update Set" : "Create Set"}
          </Button>
        </View>
      }
      renderItem={({ item }) => <CardContainer item={item} key={item.prompt} />}
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
