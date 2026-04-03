// ======================================================
//  🔥🔥🔥 BANDS MODULE — BSS1815 OFFICIAL
// ======================================================

const addBandBtn = document.getElementById("addBandBtn");
const bandsList = document.getElementById("bandsList");

addBandBtn.addEventListener("click", addBand);


// ADD BAND
async function addBand() {
  const name = document.getElementById("b-name").value.trim();
  const description = document.getElementById("b-description").value.trim();
  const file = document.getElementById("b-photo").files[0];

  if (!name || !description) {
    alert("Ranpli tout chan yo.");
    return;
  }

  let photoURL = "";

  if (file) {
    const storageRef = ref(storage, "bands/" + Date.now() + "-" + file.name);
    await uploadBytes(storageRef, file);
    photoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "bands"), {
    name,
    description,
    photoURL
  });

  alert("Band lan ajoute!");
  loadBands();
}


// LOAD BANDS
async function loadBands() {
  const snap = await getDocs(collection(db, "bands"));
  bandsList.innerHTML = "";

  snap.forEach((docSnap) => {
    const b = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${b.photoURL || 'default.png'}" style="width:100%;border-radius:8px;margin-bottom:8px;">
      <h3>${b.name}</h3>
      <span>${b.description}</span>

      <button onclick="deleteBand('${id}')"
        style="margin-top:10px;background:#b30000;color:white;">
        Efase
      </button>
    `;

    bandsList.appendChild(div);
  });
}


// DELETE BAND
window.deleteBand = async function(id) {
  if (!confirm("Ou vle efase band sa a?")) return;

  await deleteDoc(doc(db, "bands", id));
  loadBands();
};
