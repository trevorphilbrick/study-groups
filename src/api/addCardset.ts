import firestore from "@react-native-firebase/firestore";
import { CardSet } from "./updateCardSet";

export async function addCardset(
  cardSet: CardSet,
  user: FirebaseAuthTypes.User,
) {
  // ref for firestore document
  const documentRef = firestore().collection("userCollections").doc(user.uid);

  await documentRef.set({
    cardSets: [cardSet],
  });

  const res = await documentRef.get();

  console.log("added set", res.data().cardSets);

  return res.data().cardSets;
}
