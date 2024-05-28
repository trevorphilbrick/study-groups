import firestore from "@react-native-firebase/firestore";

import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export async function getCardSets(user: FirebaseAuthTypes.User) {
  const res = await firestore()
    .collection("userCollections")
    .doc(user.uid)
    .get();

  return res.data().cardSets;
}
