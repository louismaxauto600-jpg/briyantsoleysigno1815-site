import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export async function submitAppeal(
  db,
  memberId,
  caseId,
  appealReason
) {
  await addDoc(collection(db, "appeals"), {
    memberId,
    caseId,
    appealReason,
    status: "pending",
    createdAt: serverTimestamp()
  });

  return {
    success: true
  };
}
