import { ScrollView, View } from "react-native";
import Header from "../components/Header";
import { Button, Text, TextInput } from "react-native-paper";
import NoteCardForm, { NoteCard } from "../components/NoteCardForm";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import firestore from "@react-native-firebase/firestore";
import { nanoid } from "nanoid/non-secure";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { MenuStackNavigation } from "../navigators/MenuNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateSetScreen = () => {
  const [cards, setCards] = useState<NoteCard[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigation = useNavigation<MenuStackNavigation>();
  const { bottom } = useSafeAreaInsets();

  console.log(user);

  const handleCreateSet = async () => {
    // if name or cards is empty, show error toast
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
      // create payload
      const cardSet = {
        name,
        description,
        cards,
        user: user.uid,
        timestamp: new Date().toISOString(),
        setId: nanoid(),
      };
      // ref for firestore document
      const documentRef = firestore()
        .collection("userCollections")
        .doc(user.uid);

      // Check if the document exists
      const docSnapshot = await documentRef.get();

      if (!docSnapshot.exists) {
        // If the document does not exist, create it with an initial empty cardSets array
        await documentRef.set({
          cardSets: [cardSet],
        });
      } else {
        // If the document exists, update the cardSets array
        await documentRef.update({
          cardSets: firestore.FieldValue.arrayUnion(cardSet),
        });
      }
      setName("");
      setDescription("");
      setCards([]);
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Header title="Create Set" />

      <ScrollView
        style={{
          paddingTop: 24,
          flex: 1,
          paddingHorizontal: 24,
        }}
      >
        <Text>Card Set Name</Text>
        <TextInput
          placeholder="Enter set name"
          style={{ marginVertical: 16 }}
          value={name}
          onChangeText={(val) => setName(val)}
        />
        <Text>{`Card Set Description (optional)`}</Text>
        <TextInput
          placeholder="Enter set description"
          style={{ marginVertical: 16 }}
          value={description}
          onChangeText={(val) => setDescription(val)}
        />
        <Text>Note Cards</Text>
        <NoteCardForm setCards={setCards} setScreenLoading={setLoading} />
        <Button
          mode="contained"
          style={{ marginVertical: 16 }}
          onPress={() => handleCreateSet()}
          loading={loading}
          disabled={loading}
        >
          Create Set
        </Button>
        <View style={{ paddingBottom: bottom + 24 }}>
          {cards.length > 0 ? (
            <View>
              <Text style={{ textAlign: "center", marginBottom: 16 }}>
                Your Cards
              </Text>
              {cards.map((card, index) => (
                <View key={index}>
                  <Text>{card.prompt}</Text>
                  <Text>{card.answer}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={{ textAlign: "center" }}>
              Looks like you haven&apos;t created any cards yet...
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default CreateSetScreen;
