import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

export async function checkInMember(memberId, eventId) {
  try {
    await addDoc(collection(db, "attendance"), {
      memberId,
      eventId,
      checkInTime: serverTimestamp(),
      status: "Present"
    });

    return {
      success: true,
      message: "Check-in completed successfully"
    };
  } catch (error) {
    console.error("Check-in error:", error);

    return {
      success: false,
      message: "Check-in failed"
    };
  }
}
