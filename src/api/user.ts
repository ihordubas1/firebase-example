import {
  addDoc,
  collection,
  getDocs,
  Query,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";

const userFindByUidQuery = (uid: string) => {
  return query(collection(db, "users"), where("uid", "==", uid));
};

const getUserByQuery = async (query: Query) => {
  return await getDocs(query);
};

const createInitialUsersCollection = async (uid: string) => {
  await addDoc(collection(db, "users"), {
    uid,
    scenes: [],
  });
};

export { userFindByUidQuery, getUserByQuery, createInitialUsersCollection };
