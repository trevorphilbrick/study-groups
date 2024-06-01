import firestore from "@react-native-firebase/firestore";
import { CardSet } from "./updateCardSet";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export async function addCardset(
  cardSet: CardSet,
  user: FirebaseAuthTypes.User,
) {
  // ref for firestore document
  const documentRef = firestore().collection("userCollections").doc(user.uid);

  await documentRef.set({
    cardSets: [cardSet],
  });

  return { status: "success", message: "Cardset added successfully" };
}
