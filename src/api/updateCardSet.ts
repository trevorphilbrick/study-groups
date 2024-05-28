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

export async function updateCardSet(
  cardSet: CardSet,
  user: FirebaseAuthTypes.User,
) {
  // ref for firestore document
  const documentRef = firestore().collection("userCollections").doc(user.uid);

  await documentRef.update({
    cardSets: firestore.FieldValue.arrayUnion(cardSet),
  });

  const res = await documentRef.get();

  console.log("updated sets", res.data().cardSets);

  return res.data().cardSets;
}
