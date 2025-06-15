import {
  collection,
  addDoc,
  setDoc,
  doc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "./init";

const firestore = getFirestore(app);
export const database = getDatabase(app);
// const realtimePath = "/data";

const getDataFromLocalStorage = () => {
  const temp = localStorage.getItem("dataTemp");
  const humid = localStorage.getItem("dataHumid");

  if (temp && humid) {
    return {
      temperature: parseFloat(temp), // Ubah menjadi angka jika diperlukan
      humidity: parseFloat(humid), // Ubah menjadi angka jika diperlukan
    };
  }

  return null;
};

/**
 * Menyimpan data ke koleksi Firestore
 * @param {string} collectionName - Nama koleksi di Firestore
 * @param {object} data - Data yang akan disimpan
 */
export const saveToFirestore = async (collectionName: string, data: object) => {
  try {
    const dataWithTimestamp = {
      ...data,
      createdAt: Timestamp.now(), // Menambahkan tanggal dan waktu
    };
    const docRef = await addDoc(
      collection(firestore, collectionName),
      dataWithTimestamp
    );
  } catch (error) {
    console.error("Error menyimpan data ke Firestore:", error);
  }
};

/**
 * Memperbarui data pada dokumen tertentu di Firestore
 * @param {string} collectionName - Nama koleksi di Firestore
 * @param {string} docId - ID dokumen yang akan diperbarui
 * @param {object} data - Data baru untuk diperbarui
 */
export const updateFirestoreDocument = async (
  collectionName: string,
  docId: string,
  data: object
) => {
  try {
    await setDoc(doc(firestore, collectionName, docId), data, { merge: true });
  } catch (error) {
    console.error("Error memperbarui data di Firestore:", error);
  }
};

export const syncLocalStorageToFirestore = async () => {
  try {
    const localData = getDataFromLocalStorage();
    if (localData) {
      await saveToFirestore("dataValue", localData);
    } else {
    }
  } catch (error) {
    console.error("Error dalam syncLocalStorageToFirestore:", error);
  }
};
