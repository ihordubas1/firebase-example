import { onSnapshot } from "firebase/firestore";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { userFindByUidQuery } from "../api";
import { storageSceneRef, uploadScene } from "../api/scene";
import { useAuthContext } from "../contexts/auth.context";
import { checkFileExtension } from "../utils";

const ScenesPage = () => {
  const { currentUser } = useAuthContext();

  const [scenes, setScenes] = useState<string[]>();
  const [fileIsUploaded, setFileIsUploaded] = useState(false);

  const loadScenes = useCallback(() => {
    if (currentUser?.uid) {
      onSnapshot(userFindByUidQuery(currentUser.uid), (querySnapshot) => {
        const scenes = querySnapshot.docs[0]?.data()?.scenes ?? [];

        setScenes(scenes);
      });

      return;
    }

    alert("error: current user is not found");
  }, [scenes]);

  useEffect(() => loadScenes(), []);

  const uploadSceneHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const scene = event.target.files?.[0];

    if (!scene) {
      return null;
    }

    if (!checkFileExtension(scene, ["json"])) {
      alert("Scene must be .json");
      return null;
    }

    try {
      if (currentUser) {
        const uploadedScene = await uploadBytes(storageSceneRef(scene), scene);
        const url = await getDownloadURL(uploadedScene.ref);

        uploadScene(currentUser?.uid, url);
        setFileIsUploaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(scenes);
  }, [scenes]);

  return (
    <div>
      <input type="file" onChange={uploadSceneHandler} />
      {fileIsUploaded ? "File is uploaded!" : "Nothing is uploaded."}

      <ul>
        {scenes?.length &&
          scenes.map((scene, index) => (
            <li key={index}>
              <a href={scene} target={"_blank"}>
                Scene {index + 1}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { ScenesPage };
