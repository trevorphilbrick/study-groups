import firestore from "@react-native-firebase/firestore";
import { NoteCard } from "../components/NoteCardForm";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type CardSet = {
  name: string;
  description: string;
  cards: NoteCard[];
  user: string;
  timestamp: string;
  setId: string;
};

export async function deleteCardSet(
  cardSet: CardSet,
  user: FirebaseAuthTypes.User,
) {
  // ref for firestore document
  const documentRef = firestore().collection("userCollections").doc(user.uid);

  await documentRef.update({
    cardSets: firestore.FieldValue.arrayRemove(cardSet),
  });

  return { status: "success", message: "Cardset deleted successfully" };
}
