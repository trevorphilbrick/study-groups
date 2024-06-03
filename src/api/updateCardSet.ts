import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { CardSet } from "./deleteCardset";
import firestore from "@react-native-firebase/firestore";

export async function updateCardSet(
  cardSet: CardSet,
  user: FirebaseAuthTypes.User,
) {
  // ref for firestore document
  const documentRef = firestore().collection("userCollections").doc(user.uid);

  const doc = await documentRef.get();

  const cardSets = doc.data().cardSets;

  const updatedCardSets = cardSets.map((set: CardSet) => {
    if (set.setId === cardSet.setId) {
      return cardSet;
    }
    return set;
  });

  await documentRef.update({
    cardSets: updatedCardSets,
  });

  console.log("cardSet", cardSet);
}
