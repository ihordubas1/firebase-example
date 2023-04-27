import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  deleteSceneByURL,
  storageSceneRef,
  updateScene,
  uploadScene,
} from "../api/scene";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { getScenes, userFindByUidQuery } from "../api";

import { checkFileExtension } from "../utils";
import { onSnapshot } from "firebase/firestore";
import { useAuthContext } from "../contexts/auth.context";

const ScenesPage = () => {
  const { currentUser } = useAuthContext();
  const [scenes, setScenes] = useState<string[]>();
  const [myScenes, setMyScenes] = useState<string[]>();
  const [fileIsUploaded, setFileIsUploaded] = useState(false);
  const loadScenes = useCallback(() => {
    onSnapshot(getScenes(), (qs) => {
      const scenes: string[] = [];
      if (qs && qs.docs) {
        qs.docs.forEach(
          (doc) => doc?.data().scenes && scenes.push(...doc?.data().scenes)
        );
      }
      setScenes(scenes);
    });
  }, [scenes]);
  const loadMyScenes = useCallback(() => {
    if (currentUser?.uid) {
      onSnapshot(userFindByUidQuery(currentUser.uid), (qs) => {
        setMyScenes(qs.docs[0].data().scenes);
      });
    }
  }, [myScenes]);
  useEffect(() => {
    loadScenes();
    loadMyScenes();
  }, []);
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
        return url;
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
      <p style={{ marginTop: "10px" }}>MY SCENES:</p>
      <ul>
        {myScenes?.length &&
          myScenes.map((scene, index) => (
            <li key={index}>
              <a href={scene} target={"_blank"}>
                Scene {index + 1}
              </a>
              <div>
                <button
                  onClick={() =>
                    currentUser?.uid && deleteSceneByURL(currentUser.uid, scene)
                  }
                >
                  DELETE
                </button>
                <div>
                  UPDATE
                  <input
                    type="file"
                    onChange={(e) =>
                      currentUser?.uid &&
                      updateScene(currentUser.uid, index, e, scene)
                    }
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
      <p style={{ marginTop: "10px" }}>ALL SCENES:</p>
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
