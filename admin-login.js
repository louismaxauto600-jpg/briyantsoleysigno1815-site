import { getUserRole } from "./firebase-roles.js";

// Apre Firebase Auth fin konekte user la:
const user = auth.currentUser;
const role = await getUserRole(user.uid);

if (role === "SUPER_ADMIN") {
    // montre bouton / seksyon SUPER_ADMIN
}
else if (role === "ADMIN") {
    // montre bouton / seksyon ADMIN
}
else {
    // pa gen aksè admin
}
