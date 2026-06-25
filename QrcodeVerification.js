import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function verifyQRCode(memberId) {
  try {
    const memberRef = doc(db, "members", memberId);
    const memberSnap = await getDoc(memberRef);

    if (!memberSnap.exists()) {
      return {
        valid: false,
        message: "Member not found"
      };
    }

    const member = memberSnap.data();

    if (member.status !== "Active") {
      return {
        valid: false,
        message: "Member inactive"
      };
    }

    return {
      valid: true,
      message: "Member verified successfully",
      member
    };
  } catch (error) {
    console.error(error);

    return {
      valid: false,
      message: "Verification failed"
    };
  }
}
