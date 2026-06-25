import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getMemberProfile(memberId) {
  try {
    const memberRef = doc(db, "members", memberId);
    const memberSnap = await getDoc(memberRef);

    if (memberSnap.exists()) {
      return memberSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading member profile:", error);
    return null;
  }
}
