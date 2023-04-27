import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getUserByQuery, userFindByUidQuery } from "./user";

import { ChangeEvent } from "react";
import { checkFileExtension } from "../utils";
const uploadScene = async (userUID: string, sceneURL: string) => {
  try {
    const users = await getUserByQuery(userFindByUidQuery(userUID));
    const userRef = doc(db, "users", users.docs[0].id);
    await updateDoc(userRef, {
      scenes: arrayUnion(sceneURL),
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteSceneByURL = async (userId: string, scene: string) => {
  try {
    const users = await getUserByQuery(userFindByUidQuery(userId));
    const userRef = doc(db, "users", users.docs[0].id);
    await updateDoc(userRef, { scenes: arrayRemove(scene) });
  } catch (error) {
    console.log(error);
  }
};
const updateScene = async (
  userId: string,
  sceneIdx: number,
  event: ChangeEvent<HTMLInputElement>,
  lastScene: string
) => {
  try {
    const scene = event.target.files?.[0];
    if (!scene) {
      return null;
    }
    if (!checkFileExtension(scene, ["json"])) {
      alert("Scene must be .json");
      return null;
    }
    const uploadedScene = await uploadBytes(storageSceneRef(scene), scene);
    const url = await getDownloadURL(uploadedScene.ref);
    const users = await getUserByQuery(userFindByUidQuery(userId));
    const userRef = doc(db, "users", users.docs[0].id);
    await updateDoc(userRef, { scenes: arrayRemove(lastScene) });
    await updateDoc(userRef, { scenes: arrayUnion(url) });
  } catch (error) {}
};
const storageSceneRef = (scene: File) => {
  return ref(storage, `scenes/${scene.name}-${new Date().getTime()}`);
};
export { uploadScene, storageSceneRef, deleteSceneByURL, updateScene };