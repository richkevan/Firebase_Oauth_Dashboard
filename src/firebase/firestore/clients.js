import app from "../client";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const clientsCollection = "clients";

export const getClients = async () => {
  const clients = [];
  const querySnapshot = await getDocs(collection(db, clientsCollection));
  querySnapshot.forEach((doc) => {
    clients.push({ ...doc.data(), id: doc.id });
  });
  return clients;
}