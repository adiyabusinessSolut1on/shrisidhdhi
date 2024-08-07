import { storage } from "@/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTaskSnapshot,
  StorageError,
} from "firebase/storage";

const uniqueIdentifier = `image_${Date.now()}_${Math.floor(
  Math.random() * 10000
)}`;

const uploadImage = async (
  fileName: string,
  file: File,
  setProgressStatus: (progress: number | null) => void
): Promise<string> => {
  try {
    const storageRef = ref(
      storage,
      `${fileName.replace(/\s+/g, "")}/${uniqueIdentifier}_${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressStatus(progress);
        },
        (error: StorageError) => {
          console.error("Error uploading image:", error);
          setProgressStatus(null);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setProgressStatus(null);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            setProgressStatus(null);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
