import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { db, storage } from "../services/firebase";
import { getUserByQuery, userFindByUidQuery } from "./user";

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

const storageSceneRef = (scene: File) => {
  return ref(storage, `scenes/${scene.name}-${new Date().getTime()}`);
};

export { uploadScene, storageSceneRef };
