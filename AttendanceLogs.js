import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";

export async function getAttendanceLogs(eventId) {
  try {
    const attendanceRef = collection(db, "attendance");

    const q = query(
      attendanceRef,
      where("eventId", "==", eventId),
      orderBy("checkInTime", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error loading attendance logs:", error);
    return [];
  }
}
