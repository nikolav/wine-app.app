import {
  useState,
  // useEffect
} from "react";

import { storage } from "../../app/firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UPLOAD_CONFIG = {};

function useFirebaseStorageUpload() {
  const [status, setStatus] = useState({
    error: null,
    state: null,
    progress: null,
    downloadURL: null,
  });

  // const [task, setTask] = useState(null);

  // const [upload, {error, state, progress, downloadURL}]
  //  = useFirebaseUploadStorage();

  return {
    upload,
    status,
    // task,
  };

  function upload(fileObject, storagePath = "/", options = {}) {
    if (!fileObject) return;

    try {
      reset_();

      const storageRef = ref(storage, storagePath);

      const uploadTask = 
        uploadBytesResumable(storageRef, fileObject, 
        { ...UPLOAD_CONFIG, ...options });

      uploadTask.on(
        "state_changed",
        function progressHandle(snapshot) {
          setStatus((s) => ({
            ...s,
            state: snapshot.state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          }));
        },
        function errorHandle(error) {
          // https://firebase.google.com/docs/storage/web/handle-errors
          setStatus((s) => ({ ...s, error }));
        },
        function doneHandle() {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setStatus((s) => ({ ...s, downloadURL }))
          );
        }
      );

      // setTask(uploadTask);
    } catch (error) {
      setStatus((s) => ({ ...s, error }));
    }
  }
  //
  function reset_() {
    setStatus({
      error: null,
      state: null,
      progress: null,
      downloadURL: null,
    });
  }
}

export default useFirebaseStorageUpload;
