import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

export async function submitCommitteeVote(
  db,
  caseId,
  voterId,
  vote
) {
  await addDoc(collection(db, "committee_votes"), {
    caseId,
    voterId,
    vote, // approve | reject
    createdAt: serverTimestamp()
  });

  return {
    success: true
  };
}

export async function getCaseVotes(db, caseId) {
  const snapshot = await getDocs(
    query(
      collection(db, "committee_votes"),
      where("caseId", "==", caseId)
    )
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
