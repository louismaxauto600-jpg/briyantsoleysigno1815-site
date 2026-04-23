// FICHYE: /js/upload-sensitive.js

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "./firebase-auth.js";
import { SENSITIVE_TYPES, SENSITIVE_NAMES } from "./sensitive-files-list.js";

const storage = getStorage();
const db = getFirestore();

export async function uploadSensitive(file) {
    const user = auth.currentUser;
    if (!user) return;

    // Verifye si dosye a sansib
    const isSensitiveType = SENSITIVE_TYPES.includes(file.type);
    const isSensitiveName = SENSITIVE_NAMES.some(name => file.name.toLowerCase().includes(name));

    if (!isSensitiveType && !isSensitiveName) {
        console.error("DOSYE SA A PA SANSIB");
        return;
    }

    const fileRef = ref(storage, `sensitive/${user.uid}/${file.name}`);
    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    await setDoc(doc(db, "sensitiveFiles", user.uid), {
        fileName: file.name,
        fileURL: url,
        uploadedAt: Date.now()
    });

    return url;
}
