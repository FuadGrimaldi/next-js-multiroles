import {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  query,
  where,
  addDoc,
  doc,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function userAddress(collectionName: string, userId: string) {
  try {
    // Query the "address" collection where user_id matches the provided userId
    const q = query(
      collection(firestore, collectionName),
      where("id_user", "==", userId)
    );
    const snapshot = await getDocs(q);

    // Check if the address exists for the user
    if (!snapshot.empty) {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data; // Return the address data
    } else {
      return null; // Return null if no address is found
    }
  } catch (error) {
    console.error("Error fetching user address:", error);
    return null; // Return null in case of error
  }
}
